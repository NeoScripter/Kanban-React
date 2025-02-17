import { useState, useEffect, createContext } from 'react';
import { THEMES, ThemeValue } from '../utils/theme';

type Theme = ThemeValue;

type ThemeContextType = {
    theme: Theme;
    toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>(() => {
        const storedTheme = localStorage.getItem('theme') as Theme | null;
        if (storedTheme) return storedTheme;
        return window.matchMedia('(prefers-color-scheme: dark)').matches
            ? THEMES.DARK
            : THEMES.LIGHT;
    });

    useEffect(() => {
        if (theme === THEMES.DARK) {
            document.documentElement.classList.add(THEMES.DARK);
        } else {
            document.documentElement.classList.remove(THEMES.DARK);
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () =>
        setTheme((prev) => (prev === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT));

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}
