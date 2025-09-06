import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');

  // Helper function to safely access localStorage
  const getStoredTheme = () => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        return localStorage.getItem('theme');
      }
    } catch (error) {
      console.warn('localStorage is not available:', error);
    }
    return null;
  };

  // Helper function to safely set localStorage
  const setStoredTheme = (newTheme) => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('theme', newTheme);
      }
    } catch (error) {
      console.warn('Failed to save theme to localStorage:', error);
    }
  };

  // Helper function to apply theme to DOM
  const applyTheme = (themeToApply) => {
    if (typeof document !== 'undefined') {
      // Remove existing theme classes
      document.documentElement.classList.remove('light', 'dark');
      
      // Add the theme class (dark is default, so we always add it unless explicitly light)
      if (themeToApply === 'dark') {
        document.documentElement.classList.add('dark');
      }
    }
  };

  useEffect(() => {
    // Get saved theme from localStorage, fallback to 'dark' if not available
    const savedTheme = getStoredTheme() || 'dark';
    
    // Ensure the saved theme is valid, otherwise use 'dark'
    const validTheme = savedTheme === 'light' ? 'light' : 'dark';
    
    setTheme(validTheme);
    applyTheme(validTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    setStoredTheme(newTheme);
    applyTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
