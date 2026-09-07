"use client";

import { Palette, X } from "lucide-react";
import { useState } from "react";

import { useTheme } from "./ThemeProvider";

const presets = [
  { name: "Ocean", color: "#209cc0" },
  { name: "Forest", color: "#2d9b72" },
  { name: "Coral", color: "#d86b5d" },
  { name: "Violet", color: "#7864c9" },
  { name: "Amber", color: "#c58a28" },
];

function colorToRgb(color: string) {
  const value = Number.parseInt(color.slice(1), 16);

  return {
    red: (value >> 16) & 255,
    green: (value >> 8) & 255,
    blue: value & 255,
  };
}

export default function ThemeControls() {
  const { accent, setAccent } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const rgb = colorToRgb(accent);

  const updateRgb = (channel: "red" | "green" | "blue", value: string) => {
    const next = { ...rgb, [channel]: Math.min(255, Math.max(0, Number(value) || 0)) };
    const hex = [next.red, next.green, next.blue]
      .map((part) => part.toString(16).padStart(2, "0"))
      .join("");

    setAccent(`#${hex}`);
  };

  return (
    <div className="theme-controls">
      <button
        type="button"
        className="theme-toggle"
        onClick={() => setIsOpen((value) => !value)}
        aria-label="Open theme colors"
        aria-expanded={isOpen}
      >
        <Palette size={18} />
        <span>Theme</span>
      </button>

      {isOpen && (
        <div className="theme-panel">
          <div className="theme-panel-header">
            <strong>Theme color</strong>
            <button type="button" onClick={() => setIsOpen(false)} aria-label="Close theme colors">
              <X size={16} />
            </button>
          </div>

          <div className="theme-presets">
            {presets.map((preset) => (
              <button
                key={preset.name}
                type="button"
                title={preset.name}
                className={accent === preset.color ? "selected" : ""}
                style={{ backgroundColor: preset.color }}
                onClick={() => setAccent(preset.color)}
              />
            ))}
          </div>

          <label className="theme-color-picker">
            <span>Custom color</span>
            <input type="color" value={accent} onChange={(event) => setAccent(event.target.value)} />
            <code>{accent.toUpperCase()}</code>
          </label>

          <div className="theme-rgb-fields">
            {(["red", "green", "blue"] as const).map((channel) => (
              <label key={channel}>
                <span>{channel.slice(0, 1).toUpperCase()}</span>
                <input
                  type="number"
                  min="0"
                  max="255"
                  value={rgb[channel]}
                  onChange={(event) => updateRgb(channel, event.target.value)}
                  aria-label={`${channel} value`}
                />
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}