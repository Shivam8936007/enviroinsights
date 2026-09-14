"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, LineChart, ChevronDown } from "lucide-react";

interface Station {
  id: string;
  name: string;
  category: "Emission" | "Ambient" | "Effluent";
}

const STATIONS: Station[] = [
  { id: "boiler-stack", name: "Boiler Stack", category: "Emission" },
  { id: "dg-set-1", name: "DG Set 1", category: "Emission" },
  { id: "ambient-station-1", name: "Ambient Air Station 1", category: "Ambient" },
  { id: "etp-outlet", name: "ETP Outlet", category: "Effluent" },
];

interface ParameterData {
  id: string;
  title: string;
  value: string;
  unit: string;
  range: string;
  updatedAt: string;
  odamsUpdatedAt: string;
  status: "Online" | "Offline";
}

const INITIAL_PARAMETERS: ParameterData[] = [
  {
    id: "pm",
    title: "PM",
    value: "10",
    unit: "mg/Nm3",
    range: "0.0 - 80.0",
    updatedAt: "14-09-2026 11:12 AM",
    odamsUpdatedAt: "14-09-2026 11:00 AM",
    status: "Online",
  },
  {
    id: "so2",
    title: "SO2",
    value: "18.4",
    unit: "mg/Nm3",
    range: "0.0 - 600.0",
    updatedAt: "14-09-2026 11:12 AM",
    odamsUpdatedAt: "14-09-2026 11:00 AM",
    status: "Online",
  },
  {
    id: "nox",
    title: "NOx",
    value: "42.1",
    unit: "mg/Nm3",
    range: "0.0 - 400.0",
    updatedAt: "14-09-2026 11:12 AM",
    odamsUpdatedAt: "14-09-2026 11:00 AM",
    status: "Online",
  },
  {
    id: "co",
    title: "CO",
    value: "3.8",
    unit: "mg/Nm3",
    range: "0.0 - 100.0",
    updatedAt: "14-09-2026 11:12 AM",
    odamsUpdatedAt: "14-09-2026 11:00 AM",
    status: "Online",
  },
  {
    id: "flow",
    title: "Flow Rate",
    value: "1420",
    unit: "m3/hr",
    range: "0.0 - 5000.0",
    updatedAt: "14-09-2026 11:12 AM",
    odamsUpdatedAt: "14-09-2026 11:00 AM",
    status: "Online",
  },
  {
    id: "temp",
    title: "Temperature",
    value: "115",
    unit: "°C",
    range: "0.0 - 300.0",
    updatedAt: "14-09-2026 11:12 AM",
    odamsUpdatedAt: "14-09-2026 11:00 AM",
    status: "Online",
  },
];

export default function RealTimeOverview() {
  const router = useRouter();
  const [selectedStation, setSelectedStation] = useState<Station>(STATIONS[0]);
  const [filterCategory, setFilterCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [countdown, setCountdown] = useState<number>(24);

  // Live countdown timer simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 1 ? prev - 1 : 30));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const filteredStations = STATIONS.filter((station) => {
    const matchesCategory =
      filterCategory === "All" || station.category === filterCategory;
    const matchesSearch = station.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleOpenDetail = (paramTitle: string) => {
    router.push(
      `/realtime/detail?param=${encodeURIComponent(
        paramTitle
      )}&station=${encodeURIComponent(selectedStation.name)}`
    );
  };

  return (
    <div className="realtime-grid">
      {/* Stations Sidebar */}
      <aside className="stations-card">
        <div className="stations-header">
          <h2>Stations</h2>
          <div className="relative inline-block">
            <select
              className="stations-filter-select"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              aria-label="Filter stations category"
            >
              <option value="All">All</option>
              <option value="Emission">Emission</option>
              <option value="Ambient">Ambient</option>
              <option value="Effluent">Effluent</option>
            </select>
          </div>
        </div>

        <div className="stations-search">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search Stations"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="stations-list">
          {filteredStations.map((station) => {
            const isSelected = selectedStation.id === station.id;
            return (
              <button
                key={station.id}
                type="button"
                className={`station-item ${isSelected ? "active" : ""}`}
                onClick={() => setSelectedStation(station)}
              >
                <span className="station-item-name">{station.name}</span>
                <span className="station-badge">{station.category}</span>
              </button>
            );
          })}
          {filteredStations.length === 0 && (
            <div className="text-sm text-gray-500 py-2 text-center">
              No stations found
            </div>
          )}
        </div>
      </aside>

      {/* Parameters Main Content */}
      <main className="parameters-panel">
        <div className="parameters-header">
          <h2>Parameters</h2>
          <span className="next-update-counter">
            Next update in {countdown} secs
          </span>
        </div>

        <div className="parameters-grid">
          {INITIAL_PARAMETERS.map((param) => (
            <div key={param.id} className="parameter-card-rt">
              <h3 className="param-title">{param.title}</h3>

              <div className="param-value-container">
                <span className="param-value">{param.value}</span>
                <span className="param-unit">{param.unit}</span>
              </div>

              <div className="param-details">
                <div className="param-detail-row">
                  <span className="param-detail-label">Range:</span>
                  <span>{param.range}</span>
                </div>
                <div className="param-detail-row">
                  <span className="param-detail-label">Updated At:</span>
                  <span>{param.updatedAt}</span>
                </div>
                <div className="param-detail-row">
                  <span className="param-detail-label">
                    ODAMS Last Updated At:
                  </span>
                  <span>{param.odamsUpdatedAt}</span>
                  <span className="odams-status-dot" title="ODAMS Connected" />
                </div>
              </div>

              <div className="param-card-footer">
                <span className="status-online-badge">{param.status}</span>

                <button
                  type="button"
                  className="graph-trigger-btn"
                  onClick={() => handleOpenDetail(param.title)}
                  title={`View details and graph for ${param.title}`}
                  aria-label={`View details and graph for ${param.title}`}
                >
                  <LineChart size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
