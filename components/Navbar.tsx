"use client";

import { HelpCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import "../app/navbar.css";
import ThemeControls from "./ThemeControls";

export default function Navbar() {
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  return (
    <header className="navbar">

      {/* Logo */}
      <div className="navbar-logo">
        <div className="logo-symbol">
          💧
        </div>

        <div className="logo-text">
          <span>Enviro</span>
          <span>Insights</span>
        </div>
      </div>

      {/* Right side */}
      <div className="navbar-right">

        <div className="help-center">
          <HelpCircle size={22} />
          <span>Help Center</span>
        </div>

        <ThemeControls />

        <div className="navbar-divider" />

        <div className="company-name">
          Advance Enviro Solution
        </div>

        <div className="user-avatar">
          A
        </div>

      </div>

    </header>
  );
}