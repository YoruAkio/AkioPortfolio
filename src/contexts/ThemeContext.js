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
  const [theme, setTheme] = useState('system');
  const [resolvedTheme, setResolvedTheme] = useState('dark');

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

  // Helper function to get system theme preference
  const getSystemTheme = () => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'dark';
  };

  // Helper function to resolve theme based on preference
  const resolveTheme = (themePreference) => {
    if (themePreference === 'system') {
      return getSystemTheme();
    }
    return themePreference;
  };

  // Helper function to apply theme to DOM
  const applyTheme = (themeToApply) => {
    if (typeof document !== 'undefined') {
      // Remove existing theme classes
      document.documentElement.classList.remove('light', 'dark');
      
      // Add the theme class
      if (themeToApply === 'dark') {
        document.documentElement.classList.add('dark');
      }
    }
  };

  useEffect(() => {
    // Get saved theme from localStorage, fallback to 'system' if not available
    const savedTheme = getStoredTheme() || 'system';
    
    // Ensure the saved theme is valid
    const validTheme = ['system', 'light', 'dark'].includes(savedTheme) ? savedTheme : 'system';
    
    const resolved = resolveTheme(validTheme);
    
    setTheme(validTheme);
    setResolvedTheme(resolved);
    applyTheme(resolved);

    // Listen for system theme changes when using system preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (e) => {
      if (validTheme === 'system') {
        const newResolvedTheme = e.matches ? 'dark' : 'light';
        setResolvedTheme(newResolvedTheme);
        applyTheme(newResolvedTheme);
      }
    };

    if (typeof window !== 'undefined' && mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleSystemThemeChange);
      
      return () => {
        mediaQuery.removeEventListener('change', handleSystemThemeChange);
      };
    }
  }, []);

  const setThemePreference = (newTheme) => {
    const resolved = resolveTheme(newTheme);
    
    setTheme(newTheme);
    setResolvedTheme(resolved);
    setStoredTheme(newTheme);
    applyTheme(resolved);
  };

  const toggleTheme = () => {
    let newTheme;
    if (theme === 'system') {
      newTheme = 'light';
    } else if (theme === 'light') {
      newTheme = 'dark';
    } else {
      newTheme = 'system';
    }
    setThemePreference(newTheme);
  };

  return (
    <ThemeContext.Provider value={{
      theme,
      resolvedTheme,
      setTheme: setThemePreference,
      toggleTheme
    }}>
      {children}
    </ThemeContext.Provider>
  );
};
