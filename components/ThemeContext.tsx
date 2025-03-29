// components/ThemeContext.tsx
import React, { createContext, useContext, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
    isLargeText: boolean;
    toggleTextSize: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
    theme: "light",
    toggleTheme: () => {},
    isLargeText: false,
    toggleTextSize: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState<Theme>("light");
    const [isLargeText, setIsLargeText] = useState(false);

    const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));
    const toggleTextSize = () => setIsLargeText((prev) => !prev);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, isLargeText, toggleTextSize }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
