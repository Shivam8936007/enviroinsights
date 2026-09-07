"use client";

import { HelpCircle } from "lucide-react";
import "../app/navbar.css";

export default function Navbar() {
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