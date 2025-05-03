import React from 'react';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import AppEntryNavigator from './navigation/AppEntryNavigator';
import { ThemeProvider, ThemeContext } from './context/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <ThemeContext.Consumer>
        {({ isDark }) => (
          <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
            <AppEntryNavigator />
          </NavigationContainer>
        )}
      </ThemeContext.Consumer>
    </ThemeProvider>
  );
}
