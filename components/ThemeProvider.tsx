"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

interface ThemeContextValue {
  accent: string;
  setAccent: (value: string) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);
const defaultAccent = "#209cc0";

function hexToRgb(hex: string) {
  const normalized = hex.replace("#", "");
  const value = Number.parseInt(normalized, 16);

  return {
    red: (value >> 16) & 255,
    green: (value >> 8) & 255,
    blue: value & 255,
  };
}

function mixColor(color: string, target: string, amount: number) {
  const source = hexToRgb(color);
  const destination = hexToRgb(target);
  const channel = (key: "red" | "green" | "blue") =>
    Math.round(source[key] + (destination[key] - source[key]) * amount);

  return `rgb(${channel("red")}, ${channel("green")}, ${channel("blue")})`;
}

function applyTheme(accent: string) {
  const root = document.documentElement;
  const rgb = hexToRgb(accent);

  root.style.setProperty("--accent", accent);
  root.style.setProperty("--accent-rgb", `${rgb.red}, ${rgb.green}, ${rgb.blue}`);
  root.style.setProperty("--accent-dark", mixColor(accent, "#000000", 0.2));
  root.style.setProperty("--accent-light", mixColor(accent, "#ffffff", 0.86));
  root.style.setProperty("--accent-soft", mixColor(accent, "#ffffff", 0.93));
  root.style.setProperty("--accent-text", mixColor(accent, "#000000", 0.28));
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }

  return context;
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [accent, setAccentState] = useState(defaultAccent);

  useEffect(() => {
    const savedAccent = window.localStorage.getItem("enviro-accent");

    if (savedAccent && /^#[0-9a-f]{6}$/i.test(savedAccent)) {
      setAccentState(savedAccent);
    }
  }, []);

  useEffect(() => {
    applyTheme(accent);
    window.localStorage.setItem("enviro-accent", accent);
  }, [accent]);

  const value = useMemo(
    () => ({
      accent,
      setAccent: (nextAccent: string) => {
        if (/^#[0-9a-f]{6}$/i.test(nextAccent)) {
          setAccentState(nextAccent.toLowerCase());
        }
      },
    }),
    [accent]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}