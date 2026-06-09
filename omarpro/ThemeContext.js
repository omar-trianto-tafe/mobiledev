// ThemeContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lightTheme, darkTheme } from './themes';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const systemScheme = useColorScheme(); // Detects 'light' or 'dark'
  const [themeMode, setThemeMode] = useState('system'); // Options: 'light', 'dark', 'system'

  // Load persisted theme preference when app initializes
  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem('user-theme');
      if (savedTheme) {
        setThemeMode(savedTheme);
      }
    };
    loadTheme();
  }, []);

  // Update theme choice and save it locally
  const updateTheme = async (mode) => {
    setThemeMode(mode);
    await AsyncStorage.setItem('user-theme', mode);
  };

  // Determine active color scheme based on current state
  const isDark = themeMode === 'system' ? systemScheme === 'dark' : themeMode === 'dark';
  const colors = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ themeMode, updateTheme, colors, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Reusable hook for cleaner child components
export const useTheme = () => useContext(ThemeContext);
