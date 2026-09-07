"use client";

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

  if (pathname === "/") {
    return null;
  }

  return (
    <nav className="utility-container">

      <div className="utility-tabs">

        {tabs.map((tab) => {

          const Icon = tab.icon;

          const active =
            pathname === tab.path ||
            pathname.startsWith(`${tab.path}/`);

          return (
            <Link
              key={tab.path}
              href={tab.path}
              className={`utility-tab ${
                active ? "active" : ""
              }`}
            >
              <Icon size={18} strokeWidth={2.5} />

              <span>{tab.name}</span>

              {tab.name === "Custom Report" && (
                <ChevronDown size={16} />
              )}
            </Link>
          );
        })}

      </div>

    </nav>
  );
}