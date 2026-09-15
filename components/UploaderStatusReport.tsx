"use client";

import { useState } from "react";
import { BarChart3, Calendar, ChevronDown, FileSpreadsheet } from "lucide-react";

const siteOptions = [
  "AROMA DELIGHTS PVT LTD",
  "LAWRENCE ROAD INDUSTRIAL AREA CETP",
  "GLS FILMS",
  "MOTHER DAIRY FRUIT & VEGETABLE PVT LTD",
  "KARNAL CEMENT WORKS",
];

const uploaderOptions = ["ODAMS", "CPCB", "SPCB", "Central Server"];

// 15-minute reverse time slots matching Screenshot 2
const TIME_SLOTS = [
  "11:15:00",
  "11:00:00",
  "10:45:00",
  "10:30:00",
  "10:15:00",
  "10:00:00",
  "09:45:00",
  "09:30:00",
  "09:15:00",
  "09:00:00",
  "08:45:00",
  "08:30:00",
  "08:15:00",
  "08:00:00",
  "07:45:00",
];

const PARAMETER_ROWS = [
  "Boiler Stack - PM (mg/Nm3)",
  "Boiler Stack - SO2 (mg/Nm3)",
  "Boiler Stack - NOx (mg/Nm3)",
];

export default function UploaderStatusReport() {
  const [siteName, setSiteName] = useState(siteOptions[0]);
  const [uploader, setUploader] = useState(uploaderOptions[0]);
  const [dateVal, setDateVal] = useState("2026-09-14");
  const [isFetched, setIsFetched] = useState(true); // Default fetched for instant preview

  const handleFetch = () => {
    setIsFetched(true);
  };

  const handleDownloadExcel = () => {
    const filename = `Uploader_Status_Report_${siteName.replace(/[^a-zA-Z0-9]/g, "_")}_${dateVal}.csv`;
    let csvContent = `Parameter,${TIME_SLOTS.join(",")}\n`;
    PARAMETER_ROWS.forEach((param) => {
      const statuses = TIME_SLOTS.map(() => "100% (Online)").join(",");
      csvContent += `"${param}",${statuses}\n`;
    });

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <h1 className="custom-report-header-title">Uploader Status Report</h1>

      {/* Filter Card */}
      <div className="custom-report-filter-card">
        <div className="cr-filter-grid">
          {/* Site Name Dropdown */}
          <div className="cr-field">
            <label>Site Name</label>
            <div className="relative">
              <select
                className="cr-select-trigger"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
              >
                {siteOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Uploader Dropdown */}
          <div className="cr-field">
            <label>Uploader</label>
            <div className="relative">
              <select
                className="cr-select-trigger"
                value={uploader}
                onChange={(e) => setUploader(e.target.value)}
              >
                {uploaderOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Date Picker */}
          <div className="cr-field">
            <label>Date</label>
            <div className="cr-date-input">
              <input
                type="date"
                value={dateVal}
                onChange={(e) => setDateVal(e.target.value)}
              />
              <Calendar size={16} className="text-gray-400" />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="cr-actions-row">
          <button
            type="button"
            className="fetch-report-btn"
            onClick={handleFetch}
          >
            <BarChart3 size={16} />
            <span>Fetch Report</span>
          </button>

          {isFetched && (
            <button
              type="button"
              className="download-excel-btn"
              onClick={handleDownloadExcel}
            >
              <FileSpreadsheet size={16} />
              <span>Download Excel</span>
            </button>
          )}
        </div>
      </div>

      {/* Matrix Heatmap Results (Screenshot 2) */}
      {isFetched && (
        <div className="uploader-matrix-section">
          <div className="date-tab-strip">
            <span className="date-tab-item">14 Sep 2026</span>
          </div>

          <div className="matrix-card">
            <div className="matrix-scroll-wrapper">
              <table className="uploader-table">
                <thead>
                  <tr>
                    <th>Parameter</th>
                    {TIME_SLOTS.map((slot) => (
                      <th key={slot}>{slot}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {PARAMETER_ROWS.map((param) => (
                    <tr key={param}>
                      <td>{param}</td>
                      {TIME_SLOTS.map((slot) => (
                        <td key={slot}>
                          <div
                            className="status-block-green"
                            title={`${param} @ ${slot}: Data Uploaded (100%)`}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
