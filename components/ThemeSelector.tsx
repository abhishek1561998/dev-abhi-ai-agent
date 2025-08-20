"use client";

import { useState } from "react";
import { useTheme } from "@/lib/ThemeProvider";
import { Palette, Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ThemeSelector() {
  const { currentTheme, themeName, setTheme, availableThemes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const themeColors = {
    cyberpunk: { primary: "#3b82f6", secondary: "#6366f1", accent: "#8b5cf6" },
    professional: { primary: "#4f46e5", secondary: "#6366f1", accent: "#7c3aed" },
    minimal: { primary: "#475569", secondary: "#64748b", accent: "#94a3b8" },
    modern: { primary: "#3b82f6", secondary: "#4f46e5", accent: "#6366f1" },
  };

  return (
    <div className="relative">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700 rounded-lg transition-all duration-300"
        style={{ 
          background: `linear-gradient(135deg, ${currentTheme.colors.surface}80, ${currentTheme.colors.background}80)`,
          borderColor: currentTheme.colors.border + "40"
        }}
      >
        <Palette className="w-4 h-4" style={{ color: currentTheme.colors.primary }} />
        <span className="text-sm font-medium" style={{ color: currentTheme.colors.text }}>
          {currentTheme.name}
        </span>
        <ChevronDown 
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          style={{ color: currentTheme.colors.textSecondary }}
        />
      </Button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div 
            className="absolute top-full left-0 mt-2 w-64 rounded-xl shadow-2xl border backdrop-blur-xl z-50"
            style={{ 
              background: `linear-gradient(135deg, ${currentTheme.colors.surface}95, ${currentTheme.colors.background}95)`,
              borderColor: currentTheme.colors.border + "40"
            }}
          >
            <div className="p-3">
              <h3 
                className="text-sm font-semibold mb-3 flex items-center gap-2"
                style={{ color: currentTheme.colors.text }}
              >
                <Palette className="w-4 h-4" style={{ color: currentTheme.colors.primary }} />
                Choose Theme
              </h3>
              
              <div className="space-y-2">
                {availableThemes.map((theme) => {
                  const colors = themeColors[theme as keyof typeof themeColors];
                  const isSelected = theme === themeName;
                  
                  return (
                    <button
                      key={theme}
                      onClick={() => {
                        setTheme(theme);
                        setIsOpen(false);
                      }}
                      className="w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-300 hover:scale-105 group"
                      style={{
                        background: isSelected 
                          ? `linear-gradient(135deg, ${colors.primary}20, ${colors.secondary}20)`
                          : 'transparent',
                        border: `1px solid ${isSelected ? colors.primary + '40' : 'transparent'}`
                      }}
                    >
                      {/* Theme preview */}
                      <div className="flex items-center gap-1">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: colors.primary }}
                        />
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: colors.secondary }}
                        />
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: colors.accent }}
                        />
                      </div>
                      
                      {/* Theme name */}
                      <span 
                        className="flex-1 text-left text-sm font-medium"
                        style={{ 
                          color: isSelected ? colors.primary : currentTheme.colors.text 
                        }}
                      >
                        {theme.charAt(0).toUpperCase() + theme.slice(1)}
                      </span>
                      
                      {/* Check icon */}
                      {isSelected && (
                        <Check 
                          className="w-4 h-4"
                          style={{ color: colors.primary }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
