import { useRef, useState } from 'react';
import useEventListener from './useEventListener';

export function useScreenResize() {
    const [isLarge, setIsLarge] = useState(() => window.innerWidth > 768);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEventListener('resize', () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(() => {
            setIsLarge(window.innerWidth > 768);
        }, 100);
    });

    return isLarge;
}
