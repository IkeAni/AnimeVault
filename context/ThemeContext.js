import React, { createContext, useState } from 'react';

// Create a new context for theme toggling (light/dark)
export const ThemeContext = createContext();

// Provider component that wraps the app and provides theme state
export const ThemeProvider = ({ children }) => {
    // `isDark` keeps track of whether dark mode is active
    const [isDark, setIsDark] = useState(false);

    // Toggles the theme between light and dark
    const toggleTheme = () => setIsDark((prev) => !prev);

    return (
        // Pass both the current theme state and toggle function to children
        <ThemeContext.Provider value={{ isDark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};