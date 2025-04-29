import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppEntryNavigator from './navigation/AppEntryNavigator';
import { useColorScheme } from 'react-native';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';

export default function App() {
  const colorScheme = useColorScheme();

  return (
    <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AppEntryNavigator />
    </NavigationContainer>
  );
}

