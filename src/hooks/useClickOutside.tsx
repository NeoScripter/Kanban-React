import { RefObject } from 'react';
import useEventListener from './useEventListener';

export default function useClickOutside<T extends HTMLElement>(
    ref: RefObject<T | null>,
    cb: (event: MouseEvent) => void
): void {
    useEventListener(
        'click',
        (e: Event) => {
            if (!(e instanceof MouseEvent)) return;
            if (ref.current == null || ref.current.contains(e.target as Node))
                return;
            cb(e);
        },
        document
    );
}
