import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import THEME_TYPES from "../constants/ThemeTypes";

const ThemeContext = createContext(undefined);

const useTheme = () => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useTheme must be within ThemeProvider!");
  }

  return context;
};

const ThemeProvider = ({ children }) => {
  const { LIGHT, DARK } = THEME_TYPES;
  const [theme, setTheme] = useState({ mode: LIGHT });

  const toggleThemeMode = useCallback(() => {
    setTheme((pre) => ({
      ...pre,
      mode: pre.mode === LIGHT ? DARK : LIGHT,
    }));
  }, []);

  const value = useMemo(
    () => ({ theme, toggleThemeMode }),
    [theme, toggleThemeMode]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export { ThemeProvider, useTheme };
