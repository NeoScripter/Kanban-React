import { useEffect, useState } from 'react';
import type { Board } from '../types/taskTypes';

export function useLocalStorage(
    key: string,
    initialValue: Board[]
): [Board[], React.Dispatch<React.SetStateAction<Board[]>>] {
    const [value, setValue] = useState<Board[]>(() => {
        const jsonValue = localStorage.getItem(key);
        if (jsonValue !== null) {
            try {
                return JSON.parse(jsonValue) as Board[];
            } catch {
                return initialValue;
            }
        }
        return initialValue;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify([...value]));
    }, [value, key]);

    return [value, setValue];
}
