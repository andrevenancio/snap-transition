export const fade = () => {
    return {
        in: {
            duration: 0.25,
            from: { opacity: 1, height: '100%' },
            to: { opacity: 0, ease: 'Power2.easeInOut' },
        },
        out: {
            duration: 0.25,
            from: { opacity: 0, height: '100%' },
            to: { opacity: 1, ease: 'Power2.easeInOut' },
        },
    };
};

export const verticalSlide = () => {
    return {
        in: {
            duration: 0.5,
            from: { top: 'initial', bottom: 0 },
            to: { height: '0%', ease: 'Power2.easeInOut' },
        },
        out: {
            duration: 0.5,
            from: { top: 0, bottom: 'initial' },
            to: { height: '100%', ease: 'Power2.easeInOut' },
        },
    };
};
