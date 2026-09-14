"use client";

import { useState } from "react";
import { Calendar, ChevronLeft, ChevronRight, Minus, Plus } from "lucide-react";

interface ParameterAvailability {
  id: string;
  station: string;
  parameter: string;
  unit: string;
  availability: number;
}

interface SiteGroup {
  id: string;
  siteName: string;
  overallAvailability: number;
  parameters: ParameterAvailability[];
}

const INITIAL_SITES: SiteGroup[] = [
  {
    id: "lawrence-road",
    siteName: "LAWRENCE ROAD INDUSTRIAL AREA CETO(12 MLD)",
    overallAvailability: 80,
    parameters: [
      { id: "lr-1", station: "CETP", parameter: "COD", unit: "mg/L", availability: 100 },
      { id: "lr-2", station: "CETP", parameter: "BOD", unit: "mg/L", availability: 100 },
      { id: "lr-3", station: "CETP", parameter: "Flow", unit: "m³/hr", availability: 0 },
      { id: "lr-4", station: "CETP", parameter: "TSS", unit: "mg/L", availability: 100 },
      { id: "lr-5", station: "CETP", parameter: "pH", unit: "pH", availability: 100 },
    ],
  },
  {
    id: "gls-films",
    siteName: "GLS Films",
    overallAvailability: 100,
    parameters: [
      { id: "gls-1", station: "STACK2_TFH_25L", parameter: "SO₂", unit: "mg/Nm3", availability: 100 },
      { id: "gls-2", station: "STACK2_TFH_25L", parameter: "NO", unit: "mg/Nm3", availability: 100 },
      { id: "gls-3", station: "STACK2_TFH_25L", parameter: "PM", unit: "mg/Nm3", availability: 100 },
      { id: "gls-4", station: "Stack1_TFH_40L", parameter: "SO₂", unit: "mg/Nm3", availability: 100 },
    ],
  },
  {
    id: "aroma-delights",
    siteName: "AROMA DELIGHTS PVT LTD",
    overallAvailability: 95,
    parameters: [
      { id: "ar-1", station: "Boiler Stack", parameter: "PM", unit: "mg/Nm3", availability: 100 },
      { id: "ar-2", station: "Boiler Stack", parameter: "SO₂", unit: "mg/Nm3", availability: 90 },
      { id: "ar-3", station: "Boiler Stack", parameter: "NOx", unit: "mg/Nm3", availability: 95 },
    ],
  },
  {
    id: "mother-dairy",
    siteName: "MOTHER DAIRY FRUIT & VEGETABLE PVT LTD",
    overallAvailability: 100,
    parameters: [
      { id: "md-1", station: "ETP Outlet", parameter: "pH", unit: "pH", availability: 100 },
      { id: "md-2", station: "ETP Outlet", parameter: "BOD", unit: "mg/L", availability: 100 },
      { id: "md-3", station: "ETP Outlet", parameter: "COD", unit: "mg/L", availability: 100 },
    ],
  },
  {
    id: "karnal-cement",
    siteName: "KARNAL CEMENT WORKS",
    overallAvailability: 88,
    parameters: [
      { id: "kc-1", station: "Kiln Stack", parameter: "PM", unit: "mg/Nm3", availability: 88 },
      { id: "kc-2", station: "Kiln Stack", parameter: "SO₂", unit: "mg/Nm3", availability: 88 },
    ],
  },
];

export default function DataAvailabilityTable() {
  const [selectedDate, setSelectedDate] = useState<string>("2026-09-13");
  const [expandedSites, setExpandedSites] = useState<Record<string, boolean>>({
    "lawrence-road": true,
    "gls-films": true,
    "aroma-delights": false,
    "mother-dairy": false,
    "karnal-cement": false,
  });

  const toggleSite = (siteId: string) => {
    setExpandedSites((prev) => ({
      ...prev,
      [siteId]: !prev[siteId],
    }));
  };

  return (
    <div>
      {/* Top Header & Date Picker */}
      <div className="data-availability-top">
        <h1 className="data-availability-title">Data Availability</h1>

        <div className="date-picker-wrapper">
          <span>Date:</span>
          <div className="date-input-box">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
            <Calendar size={16} className="text-gray-400" />
          </div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="da-card">
        <div className="da-card-header">
          <span>Site Name</span>
          <span>Data Availability</span>
        </div>

        {/* Site Accordion Groups */}
        {INITIAL_SITES.map((site) => {
          const isExpanded = !!expandedSites[site.id];
          return (
            <div key={site.id} className="site-accordion-group">
              <button
                type="button"
                className="site-accordion-header"
                onClick={() => toggleSite(site.id)}
                aria-expanded={isExpanded}
              >
                <div className="site-title-container">
                  <span className="toggle-icon-btn">
                    {isExpanded ? <Minus size={12} /> : <Plus size={12} />}
                  </span>
                  <span className="site-name-text">{site.siteName}</span>
                </div>
                <span className="site-avail-score">
                  {site.overallAvailability}%
                </span>
              </button>

              {/* Accordion Inner Content */}
              {isExpanded && (
                <div className="site-accordion-content">
                  <table className="da-inner-table">
                    <thead>
                      <tr>
                        <th>Station</th>
                        <th>Parameter</th>
                        <th>Unit</th>
                        <th>Availability (%)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {site.parameters.map((param) => (
                        <tr key={param.id}>
                          <td>{param.station}</td>
                          <td>{param.parameter}</td>
                          <td>{param.unit}</td>
                          <td
                            className={`avail-badge ${
                              param.availability === 100
                                ? "full"
                                : param.availability === 0
                                ? "zero"
                                : "partial"
                            }`}
                          >
                            {param.availability}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Inner Pagination */}
                  <div className="da-group-pagination">
                    <button
                      type="button"
                      className="page-btn"
                      disabled
                      aria-label="Previous Page"
                    >
                      <ChevronLeft size={14} />
                    </button>
                    <button type="button" className="page-btn active">
                      1
                    </button>
                    <button
                      type="button"
                      className="page-btn"
                      disabled
                      aria-label="Next Page"
                    >
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
