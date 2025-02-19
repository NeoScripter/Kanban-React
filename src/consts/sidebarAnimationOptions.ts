export function getSidebarAnimationOptions(isLarge: boolean) {
    const options = {
        initial: isLarge
            ? { x: -260, y: -100, transition: { duration: 0, ease: 'easeOut' } }
            : { opacity: 0, y: 0 },
        animate: isLarge
            ? { x: 0, transition: { duration: 0.4, ease: 'easeOut' } }
            : { opacity: 1, y: 0 },
        exit: isLarge
            ? { x: -260, transition: { duration: 0.4, ease: 'easeOut' } }
            : { opacity: 0, y: 0 }
    };

    return options;
}
