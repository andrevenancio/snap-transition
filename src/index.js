import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TweenMax } from 'gsap';
import { fade } from './effects';

export * from './effects';

export class Transition extends Component {
    static propTypes = {
        children: PropTypes.node,
        location: PropTypes.object,
        inComplete: PropTypes.func,
        outComplete: PropTypes.func,
        type: PropTypes.object,
    };

    static defaultProps = {
        inComplete: () => null,
        outComplete: () => null,
        type: fade(),
    };

    state = {
        previousChildren: null,
    };

    domElement = React.createRef();

    mask = React.createRef();

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.toggle(nextProps);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.previousChildren !== this.state.previousChildren) {
            if (this.state.previousChildren !== null) {
                this.out();
            } else {
                this.in();
            }
        }
    }

    toggle({ location }) {
        if (location.pathname !== this.props.location.pathname) {
            this.setState({
                previousChildren: this.props.children,
            });
        }
    }

    in() {
        TweenMax.fromTo(
            this.mask.current,
            this.props.type.in.duration,
            { ...this.props.type.in.from },
            {
                ...this.props.type.in.to,
                onComplete: () => {
                    this.inComplete();
                },
            }
        );
    }

    inComplete() {
        this.props.inComplete();
    }

    out() {
        TweenMax.fromTo(
            this.mask.current,
            this.props.type.out.duration,
            { ...this.props.type.out.from },
            {
                ...this.props.type.out.to,
                onComplete: () => {
                    global.scrollTo(0, 0);
                    this.outComplete();
                },
            }
        );
    }

    outComplete() {
        this.setState({
            previousChildren: null,
        });
        this.props.outComplete();
    }

    render() {
        const { children } = this.props;
        const { previousChildren } = this.state;
        return (
            <div
                ref={this.domElement}
                style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                }}
            >
                <div
                    ref={this.mask}
                    style={{
                        position: 'fixed',
                        width: '100vw',
                        top: 0,
                        left: 0,
                        backgroundColor: '#151517',
                        pointerEvents: 'none',
                        zIndex: 1000,
                    }}
                />
                {previousChildren || children}
            </div>
        );
    }
}
