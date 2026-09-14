"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  LineChart as LineChartIcon,
  Table as TableIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from "recharts";

interface DataRow {
  id: string;
  timestamp: string;
  station: string;
  parameter: string;
  unit: string;
  value: number | string;
}

// Mock dataset for 1 Hour Average matching Screenshot 2
const HOURLY_DATA: DataRow[] = [
  { id: "1", timestamp: "13-09-2026 11:00", station: "Boiler Stack", parameter: "PM", unit: "mg/Nm3", value: 10 },
  { id: "2", timestamp: "13-09-2026 12:00", station: "Boiler Stack", parameter: "PM", unit: "mg/Nm3", value: 10 },
  { id: "3", timestamp: "13-09-2026 13:00", station: "Boiler Stack", parameter: "PM", unit: "mg/Nm3", value: 10 },
  { id: "4", timestamp: "13-09-2026 14:00", station: "Boiler Stack", parameter: "PM", unit: "mg/Nm3", value: 10 },
  { id: "5", timestamp: "13-09-2026 15:00", station: "Boiler Stack", parameter: "PM", unit: "mg/Nm3", value: 10 },
  { id: "6", timestamp: "13-09-2026 16:00", station: "Boiler Stack", parameter: "PM", unit: "mg/Nm3", value: 10 },
  { id: "7", timestamp: "13-09-2026 17:00", station: "Boiler Stack", parameter: "PM", unit: "mg/Nm3", value: 10 },
  { id: "8", timestamp: "13-09-2026 18:00", station: "Boiler Stack", parameter: "PM", unit: "mg/Nm3", value: 10 },
  { id: "9", timestamp: "13-09-2026 19:00", station: "Boiler Stack", parameter: "PM", unit: "mg/Nm3", value: 9.85 },
  { id: "10", timestamp: "13-09-2026 20:00", station: "Boiler Stack", parameter: "PM", unit: "mg/Nm3", value: 10 },
];

// Mock dataset for 15 Min Average
const MIN15_DATA: DataRow[] = [
  { id: "m1", timestamp: "13-09-2026 19:00", station: "Boiler Stack", parameter: "PM", unit: "mg/Nm3", value: 9.85 },
  { id: "m2", timestamp: "13-09-2026 19:15", station: "Boiler Stack", parameter: "PM", unit: "mg/Nm3", value: 9.90 },
  { id: "m3", timestamp: "13-09-2026 19:30", station: "Boiler Stack", parameter: "PM", unit: "mg/Nm3", value: 10.05 },
  { id: "m4", timestamp: "13-09-2026 19:45", station: "Boiler Stack", parameter: "PM", unit: "mg/Nm3", value: 9.95 },
  { id: "m5", timestamp: "13-09-2026 20:00", station: "Boiler Stack", parameter: "PM", unit: "mg/Nm3", value: 10.00 },
  { id: "m6", timestamp: "13-09-2026 20:15", station: "Boiler Stack", parameter: "PM", unit: "mg/Nm3", value: 10.12 },
  { id: "m7", timestamp: "13-09-2026 20:30", station: "Boiler Stack", parameter: "PM", unit: "mg/Nm3", value: 9.88 },
  { id: "m8", timestamp: "13-09-2026 20:45", station: "Boiler Stack", parameter: "PM", unit: "mg/Nm3", value: 10.02 },
];

export default function RealTimeDetail() {
  const searchParams = useSearchParams();
  const paramName = searchParams.get("param") || "PM";
  const stationName = searchParams.get("station") || "Boiler Stack";

  const [viewMode, setViewMode] = useState<"graph" | "table">("table");
  const [resolution, setResolution] = useState<"1hour" | "15min">("1hour");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const activeDataset = resolution === "1hour" ? HOURLY_DATA : MIN15_DATA;
  const headingTitle = `${
    resolution === "1hour" ? "1 Hour Average" : "15 Min Average"
  } of ${paramName}`;

  return (
    <div className="detail-container">
      {/* Top Header Navigation */}
      <div className="detail-top-nav">
        <div className="detail-breadcrumb">
          <Link
            href="/realtime"
            className="back-link-btn"
            title="Back to Real Time Overview"
            aria-label="Back to Real Time Overview"
          >
            <ArrowLeft size={18} />
          </Link>

          <span>AROMA DELIGHTS PVT LTD</span>
          <span className="text-gray-400">/</span>
          <span>{stationName}</span>
          <span className="station-badge ml-1">Emission</span>
        </div>

        {/* View & Resolution Controls (Screenshot 2) */}
        <div className="detail-controls">
          {/* Graph / Table Toggle */}
          <div className="toggle-group">
            <button
              type="button"
              className={`toggle-item-btn ${
                viewMode === "graph" ? "active" : ""
              }`}
              onClick={() => setViewMode("graph")}
            >
              <LineChartIcon size={16} />
              <span>Graph</span>
            </button>
            <button
              type="button"
              className={`toggle-item-btn ${
                viewMode === "table" ? "active" : ""
              }`}
              onClick={() => setViewMode("table")}
            >
              <TableIcon size={16} />
              <span>Table</span>
            </button>
          </div>

          {/* Resolution Toggle */}
          <div className="toggle-group">
            <button
              type="button"
              className={`toggle-item-btn ${
                resolution === "1hour" ? "active" : ""
              }`}
              onClick={() => setResolution("1hour")}
            >
              <span>1 Hour Average</span>
            </button>
            <button
              type="button"
              className={`toggle-item-btn ${
                resolution === "15min" ? "active" : ""
              }`}
              onClick={() => setResolution("15min")}
            >
              <span>15 Min Average</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Section Card */}
      <div className="detail-card">
        <h2 className="detail-heading">{headingTitle}</h2>

        {viewMode === "table" ? (
          /* Table View (Screenshot 2) */
          <>
            <div className="realtime-table-wrapper">
              <table className="realtime-table">
                <thead>
                  <tr>
                    <th>Timestamp</th>
                    <th>Station</th>
                    <th>Parameter</th>
                    <th>Unit</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  {activeDataset.map((row) => (
                    <tr key={row.id}>
                      <td>{row.timestamp}</td>
                      <td>{stationName}</td>
                      <td>{paramName}</td>
                      <td>{row.unit}</td>
                      <td className="font-semibold">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="realtime-pagination">
              <button
                type="button"
                className="page-btn"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                className={`page-btn ${currentPage === 1 ? "active" : ""}`}
                onClick={() => setCurrentPage(1)}
              >
                1
              </button>
              <button
                type="button"
                className={`page-btn ${currentPage === 2 ? "active" : ""}`}
                onClick={() => setCurrentPage(2)}
              >
                2
              </button>
              <button
                type="button"
                className={`page-btn ${currentPage === 3 ? "active" : ""}`}
                onClick={() => setCurrentPage(3)}
              >
                3
              </button>
              <button
                type="button"
                className="page-btn"
                onClick={() => setCurrentPage((p) => Math.min(3, p + 1))}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </>
        ) : (
          /* Graph View */
          <div className="graph-container">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={activeDataset}
                margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
              >
                <defs>
                  <linearGradient id="paramGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#209cc0" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#209cc0" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="timestamp"
                  stroke="#64748b"
                  fontSize={12}
                  tickMargin={8}
                />
                <YAxis
                  stroke="#64748b"
                  fontSize={12}
                  domain={[0, 80]}
                  unit={` ${activeDataset[0]?.unit || ""}`}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="custom-chart-tooltip">
                          <p className="font-bold">{label}</p>
                          <p>
                            {paramName}:{" "}
                            <span className="text-cyan-300 font-bold">
                              {payload[0].value} {activeDataset[0]?.unit}
                            </span>
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <ReferenceLine
                  y={80}
                  label={{
                    value: "Limit: 80 mg/Nm3",
                    fill: "#ef4444",
                    fontSize: 12,
                    position: "top",
                  }}
                  stroke="#ef4444"
                  strokeDasharray="4 4"
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#209cc0"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#paramGradient)"
                  dot={{ r: 4, fill: "#209cc0", strokeWidth: 2, stroke: "#fff" }}
                  activeDot={{ r: 7 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}
