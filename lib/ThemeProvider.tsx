"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Theme = {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    success: string;
    warning: string;
    error: string;
  };
  gradients: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
};

export const themes: Record<string, Theme> = {
  cyberpunk: {
    name: "AI Dark",
    colors: {
      primary: "rgb(59, 130, 246)", // blue-500 - more professional
      secondary: "rgb(99, 102, 241)", // indigo-500 - subtle
      accent: "rgb(139, 92, 246)", // violet-500 - muted
      background: "rgb(3, 7, 18)", // slate-950 - deep dark
      surface: "rgb(15, 23, 42)", // slate-900 - subtle surface
      text: "rgb(248, 250, 252)", // slate-50 - soft white
      textSecondary: "rgb(148, 163, 184)", // slate-400 - muted
      border: "rgb(51, 65, 85)", // slate-700 - subtle borders
      success: "rgb(34, 197, 94)", // green-500
      warning: "rgb(245, 158, 11)", // amber-500
      error: "rgb(239, 68, 68)", // red-500
    },
    gradients: {
      primary: "from-blue-500 to-indigo-600",
      secondary: "from-indigo-500 to-violet-500",
      accent: "from-violet-500 to-purple-500",
      background: "from-slate-950 via-slate-900 to-slate-950",
    },
  },
  professional: {
    name: "Professional",
    colors: {
      primary: "rgb(79, 70, 229)", // indigo-600 - professional
      secondary: "rgb(99, 102, 241)", // indigo-500 - subtle
      accent: "rgb(124, 58, 237)", // violet-600 - muted accent
      background: "rgb(17, 24, 39)", // gray-900 - professional dark
      surface: "rgb(31, 41, 55)", // gray-800 - clean surface
      text: "rgb(243, 244, 246)", // gray-100 - clean text
      textSecondary: "rgb(156, 163, 175)", // gray-400 - muted
      border: "rgb(75, 85, 99)", // gray-600 - subtle
      success: "rgb(34, 197, 94)", // green-500
      warning: "rgb(245, 158, 11)", // amber-500
      error: "rgb(239, 68, 68)", // red-500
    },
    gradients: {
      primary: "from-indigo-600 to-indigo-500",
      secondary: "from-indigo-500 to-violet-600",
      accent: "from-violet-600 to-purple-600",
      background: "from-gray-900 via-gray-800 to-gray-900",
    },
  },
  minimal: {
    name: "Minimal",
    colors: {
      primary: "rgb(71, 85, 105)", // slate-600 - minimal
      secondary: "rgb(100, 116, 139)", // slate-500 - subtle
      accent: "rgb(148, 163, 184)", // slate-400 - very subtle
      background: "rgb(2, 6, 23)", // slate-950 - deep minimal
      surface: "rgb(15, 23, 42)", // slate-900 - clean
      text: "rgb(241, 245, 249)", // slate-100 - clean
      textSecondary: "rgb(148, 163, 184)", // slate-400 - muted
      border: "rgb(51, 65, 85)", // slate-700 - minimal
      success: "rgb(34, 197, 94)", // green-500
      warning: "rgb(245, 158, 11)", // amber-500
      error: "rgb(239, 68, 68)", // red-500
    },
    gradients: {
      primary: "from-slate-600 to-slate-500",
      secondary: "from-slate-500 to-slate-400",
      accent: "from-slate-400 to-slate-300",
      background: "from-slate-950 via-slate-900 to-slate-950",
    },
  },
  modern: {
    name: "Modern",
    colors: {
      primary: "rgb(59, 130, 246)", // blue-500 - clean modern
      secondary: "rgb(79, 70, 229)", // indigo-600 - professional
      accent: "rgb(99, 102, 241)", // indigo-500 - subtle
      background: "rgb(3, 7, 18)", // slate-950 - modern dark
      surface: "rgb(15, 23, 42)", // slate-900 - clean
      text: "rgb(241, 245, 249)", // slate-100 - crisp
      textSecondary: "rgb(148, 163, 184)", // slate-400 - muted
      border: "rgb(51, 65, 85)", // slate-700 - clean
      success: "rgb(34, 197, 94)", // green-500
      warning: "rgb(245, 158, 11)", // amber-500
      error: "rgb(239, 68, 68)", // red-500
    },
    gradients: {
      primary: "from-blue-500 to-indigo-600",
      secondary: "from-indigo-600 to-indigo-500",
      accent: "from-indigo-500 to-blue-500",
      background: "from-slate-950 via-slate-900 to-slate-950",
    },
  },
};

interface ThemeContextType {
  currentTheme: Theme;
  themeName: string;
  setTheme: (themeName: string) => void;
  availableThemes: string[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeName, setThemeName] = useState<string>("professional");

  useEffect(() => {
    const savedTheme = localStorage.getItem("app-theme");
    if (savedTheme && themes[savedTheme]) {
      setThemeName(savedTheme);
    }
  }, []);

  const setTheme = (newThemeName: string) => {
    if (themes[newThemeName]) {
      setThemeName(newThemeName);
      localStorage.setItem("app-theme", newThemeName);
    }
  };

  const currentTheme = themes[themeName];
  const availableThemes = Object.keys(themes);

  // Apply CSS custom properties
  useEffect(() => {
    const root = document.documentElement;
    const theme = currentTheme;
    
    root.style.setProperty('--color-primary', theme.colors.primary);
    root.style.setProperty('--color-secondary', theme.colors.secondary);
    root.style.setProperty('--color-accent', theme.colors.accent);
    root.style.setProperty('--color-background', theme.colors.background);
    root.style.setProperty('--color-surface', theme.colors.surface);
    root.style.setProperty('--color-text', theme.colors.text);
    root.style.setProperty('--color-text-secondary', theme.colors.textSecondary);
    root.style.setProperty('--color-border', theme.colors.border);
    root.style.setProperty('--color-success', theme.colors.success);
    root.style.setProperty('--color-warning', theme.colors.warning);
    root.style.setProperty('--color-error', theme.colors.error);
  }, [currentTheme]);

  return (
    <ThemeContext.Provider value={{ currentTheme, themeName, setTheme, availableThemes }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
