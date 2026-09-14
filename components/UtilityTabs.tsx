"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  MapPin,
  Home,
  Monitor,
  Camera,
  FileBarChart,
  Activity,
  List,
  FileText,
  ChevronDown,
} from "lucide-react";

import "../app/utility-tabs.css";

const tabs = [
  {
    name: "Map View",
    path: "/map",
    icon: MapPin,
  },
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: Home,
  },
  {
    name: "Site Status",
    path: "/site-status",
    icon: Monitor,
  },
  {
    name: "Camera",
    path: "/camera",
    icon: Camera,
  },
  {
    name: "Industry Reports",
    path: "/industry-reports",
    icon: FileBarChart,
  },
  {
    name: "Real Time",
    path: "/realtime",
    icon: Activity,
  },
  {
    name: "Data Availability",
    path: "/data-availability",
    icon: List,
  },
  {
    name: "Custom Report",
    path: "/custom-report",
    icon: FileText,
  },
];

export default function UtilityTabs() {
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  if (pathname === "/") {
    return null;
  }

  return (
    <nav className="utility-container">
      <div className="utility-tabs">
        {tabs.map((tab) => {
          const Icon = tab.icon;

          const active =
            pathname === tab.path || pathname.startsWith(`${tab.path}/`);

          if (tab.name === "Custom Report") {
            return (
              <div
                key={tab.path}
                className="utility-tab-dropdown-wrap"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <Link
                  href={tab.path}
                  className={`utility-tab ${active ? "active" : ""}`}
                  onClick={() => setDropdownOpen((prev) => !prev)}
                >
                  <Icon size={18} strokeWidth={2.5} />
                  <span>{tab.name}</span>
                  <ChevronDown size={16} />
                </Link>

                {/* {(dropdownOpen || active) && (
                  <div className="utility-tab-dropdown-menu">
                    <Link
                      href="/custom-report"
                      className="utility-tab-dropdown-item"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Uploader Report
                    </Link>
                  </div>
                )} */}
              </div>
            );
          }

          return (
            <Link
              key={tab.path}
              href={tab.path}
              className={`utility-tab ${active ? "active" : ""}`}
            >
              <Icon size={18} strokeWidth={2.5} />
              <span>{tab.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}