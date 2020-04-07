# snap-transition

transitions done in a snap 👌.

## Motivation

Most transitions done in React have been made using a library like `react-transition-group` or `react-transition-group-plus`. Those are great solutions so you should use them.

If all you want is a simple css transition and you don't need any callbacks or sequencing you should use them. Seriously! Why are you still reading this?

However, if you're like me, and you want to be able to control exactly how your transition works without having to manually setup `mountOnEnter`, `enter`, `exit`, `appear` and all those extra methods, then this might be what you're looking for.

## How does it work?

You should wrap your routes in a <Transition> component. All that component needs to know is when should the page change, so you provide it with the location and how should it animate. so you provide it with an transition effect.


## Example
https://codesandbox.io/s/nice-tereshkova-54lck

Here's an example below on how your React application can look like.

```javascript
import React from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import { Transition, verticalSlide } from 'snap-transition';
import { routes } from './routes';

const Application = ({ location }) => {
    return (
        <Transition location={location} type={verticalSlide()}>
            <Switch location={location}>
                {routes.map((route) => (
                    <Route
                        key={`component-${route.path}`}
                        path={route.path}
                        exact={route.exact}
                    >
                        {route.child}
                    </Route>
                ))}
            </Switch>
        </Transition>
    );
};

export default withRouter(Application);
```
