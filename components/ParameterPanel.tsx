"use client";

import {
  Search,
  ChevronRight,
} from "lucide-react";

export default function ParameterPanel() {

  return (
    <aside className="parameter-panel">

      <div className="parameter-header">

        <h2>Parameters</h2>

        <div className="auto-rotate">
          <span>24s</span>
          <span>Auto Rotate</span>

          <div className="toggle">
            <div />
          </div>
        </div>

      </div>

      {/* Search */}
      <div className="parameter-search">

        <Search size={18} />

        <input
          type="text"
          placeholder="Search Parameters"
        />

      </div>

      {/* Parameter */}
      <div className="parameter-card">

        <div className="parameter-title">

          <strong>PM</strong>

          <ChevronRight size={21} />

        </div>

        <div className="parameter-row">
          <span>Boiler Stack</span>

          <span className="pm-value">
            10.0 mg/Nm3
          </span>
        </div>

        <div className="parameter-row">
          <span>Emission</span>

          <span>
            05-09-2026 21:44 PM
          </span>
        </div>

        <div className="parameter-row">
          <span>Standard: N/A</span>
        </div>

      </div>

    </aside>
  );
}