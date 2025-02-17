export const THEMES = {
    DARK: 'dark',
    LIGHT: 'light',
}

export type ThemeType = keyof typeof THEMES; 
export type ThemeValue = (typeof THEMES)[ThemeType];