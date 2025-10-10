import React, { createContext, useContext, useState, useEffect } from 'react';

const themes = [
  { id: "noite-estelar", name: "Noite Estelar", bg: "#0a0f1f", accent: "#6b5cff" },
  { id: "crepusculo", name: "Crepúsculo Literário", bg: "#2e1b0f", accent: "#ff8a3c" },
  { id: "neon-cosmico", name: "Neon Cósmico", bg: "#080808", accent: "#0ff" },
];

interface ThemeContextType {
  theme: string;
  setTheme: (theme: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState("noite-estelar");

  useEffect(() => {
    const saved = localStorage.getItem("profile-theme");
    const initialTheme = saved || "noite-estelar";
    setThemeState(initialTheme);
    const selectedTheme = themes.find(t => t.id === initialTheme);
    if (selectedTheme) {
      document.documentElement.style.setProperty('--bg-color', selectedTheme.bg);
      document.documentElement.style.setProperty('--accent-color', selectedTheme.accent);
    }
  }, []);

  const setTheme = (newTheme: string) => {
    setThemeState(newTheme);
    localStorage.setItem("profile-theme", newTheme);
    const selectedTheme = themes.find(t => t.id === newTheme);
    if (selectedTheme) {
      document.documentElement.style.setProperty('--bg-color', selectedTheme.bg);
      document.documentElement.style.setProperty('--accent-color', selectedTheme.accent);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
