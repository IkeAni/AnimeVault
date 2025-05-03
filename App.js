import React from 'react';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import AppEntryNavigator from './navigation/AppEntryNavigator';
import { ThemeProvider, ThemeContext } from './context/ThemeContext';

// Root component of the app
export default function App() {
  return (
    // Wrap the entire app in ThemeProvider to provide dark/light mode support
    <ThemeProvider>
      {/* Access the current theme context */}
      <ThemeContext.Consumer>
        {({ isDark }) => (
          // Set the navigation theme based on dark mode state
          <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
            {/* Handle authenticated or unauthenticated navigation flow */}
            <AppEntryNavigator />
          </NavigationContainer>
        )}
      </ThemeContext.Consumer>
    </ThemeProvider>
  );
}