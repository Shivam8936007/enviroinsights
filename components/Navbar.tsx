"use client";

import Image from "next/image";
import { HelpCircle, LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import "../app/navbar.css";
import ThemeControls from "./ThemeControls";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const handleLogout = () => {
    setProfileMenuOpen(false);
    window.localStorage.removeItem("enviro-auth");
    window.sessionStorage.clear();
    router.push("/");
  };

  if (pathname === "/") {
    return null;
  }

  return (
    <header className="navbar">

      {/* Logo */}
      <div className="navbar-logo">
        <Image
          className="navbar-logo-image"
          src="/Enviro.png"
          alt="Enviro Alignment LLP"
          width={180}
          height={54}
          priority
        />
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
     Enviro Alignment LLP       
     </div>

        <div className="profile-menu">
          <button
            type="button"
            className="user-avatar"
            onClick={() => setProfileMenuOpen((open) => !open)}
            aria-label="Open profile menu"
            aria-expanded={profileMenuOpen}
            title="Open profile menu"
          >
            A
          </button>

          {profileMenuOpen && (
            <div className="profile-dropdown">
              <button
                type="button"
                className="logout-button"
                onClick={handleLogout}
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>

      </div>

    </header>
  );
}