import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Theme } from '../../shared/types';
import { THEMES, THEME_DEFINITIONS } from '../../shared/constants';

interface ThemeContextType {
  theme: Theme;
  currentThemeName: string;
  setTheme: (themeName: string) => void;
}

const defaultThemeContext: ThemeContextType = {
  theme: THEME_DEFINITIONS[THEMES.GREEN],
  currentThemeName: THEMES.GREEN,
  setTheme: () => {}
};

export const ThemeContext = createContext<ThemeContextType>(defaultThemeContext);

interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: string;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ 
  children, 
  initialTheme = THEMES.GREEN 
}) => {
  const [currentThemeName, setCurrentThemeName] = useState(initialTheme);
  const [theme, setThemeState] = useState<Theme>(THEME_DEFINITIONS[initialTheme]);

  const setTheme = (themeName: string) => {
    if (THEME_DEFINITIONS[themeName]) {
      setCurrentThemeName(themeName);
      setThemeState(THEME_DEFINITIONS[themeName]);
      
      // 更新CSS变量
      document.documentElement.style.setProperty('--primary', THEME_DEFINITIONS[themeName].primary);
      document.documentElement.style.setProperty('--primary-dark', THEME_DEFINITIONS[themeName].primaryDark);
      document.documentElement.style.setProperty('--accent', THEME_DEFINITIONS[themeName].accent);
      document.documentElement.style.setProperty('--background', THEME_DEFINITIONS[themeName].background);
      document.documentElement.style.setProperty('--border', THEME_DEFINITIONS[themeName].border);
      document.documentElement.style.setProperty('--text-primary', THEME_DEFINITIONS[themeName].textPrimary);
      document.documentElement.style.setProperty('--text-secondary', THEME_DEFINITIONS[themeName].textSecondary);
      document.documentElement.style.setProperty('--scanline-opacity', THEME_DEFINITIONS[themeName].scanlineOpacity.toString());
    }
  };

  // 初始化CSS变量
  React.useEffect(() => {
    setTheme(currentThemeName);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, currentThemeName, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
