import { useContext } from "react";
import { ThemeContext } from "../providers/ThemeProvider";

export function useThemeContext() {
    const themeContext = useContext(ThemeContext);

    if (themeContext == null) {
        throw new Error('Must be within provider');
    }

    return themeContext;
}