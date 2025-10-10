import React from "react";
import { useTheme } from "../contexts/ThemeContext";

const defaultThemes = [
  { id: "noite-estelar", name: "Noite Estelar", bg: "#0a0f1f", accent: "#6b5cff" },
  { id: "crepusculo", name: "Crepúsculo Literário", bg: "#2e1b0f", accent: "#ff8a3c" },
  { id: "neon-cosmico", name: "Neon Cósmico", bg: "#080808", accent: "#0ff" },
];

const profileThemes = [
  { id: "cosmic", name: "Cósmico", bg: "#1a1a2e", accent: "#16213e" },
  { id: "nebula", name: "Nebulosa", bg: "#2d1b69", accent: "#9d4edd" },
  { id: "galaxy", name: "Galáxia", bg: "#0f0f23", accent: "#1e3a8a" },
  { id: "stars", name: "Estrelas", bg: "#000000", accent: "#fbbf24" },
];

interface ThemeSelectorProps {
  selectedTheme?: string;
  onThemeChange?: (theme: string) => void;
}

function ThemeSelector({ selectedTheme, onThemeChange }: ThemeSelectorProps) {
  const { theme: globalTheme, setTheme } = useTheme();
  const isProfileSelector = selectedTheme !== undefined && onThemeChange !== undefined;
  const themes = isProfileSelector ? profileThemes : defaultThemes;
  const currentTheme = isProfileSelector ? selectedTheme : globalTheme;
  const handleChange = isProfileSelector ? onThemeChange : (t: string) => setTheme(t as any);

  return (
    <div className="p-4 bg-gray-800 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Escolher Tema de Perfil</h3>
      <div className="grid grid-cols-1 gap-4">
        {themes.map((t) => (
          <label key={t.id} className="flex items-center space-x-4 cursor-pointer">
            <input
              type="radio"
              name="theme"
              value={t.id}
              checked={currentTheme === t.id}
              onChange={() => handleChange(t.id)}
              className="mr-2"
            />
            <div className="flex items-center space-x-2">
              <div
                className="w-6 h-6 rounded-full border-2 border-white"
                style={{ backgroundColor: t.bg }}
              ></div>
              <div
                className="w-6 h-6 rounded-full border-2 border-white"
                style={{ backgroundColor: t.accent }}
              ></div>
              <span>{t.name}</span>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}

export default ThemeSelector;
