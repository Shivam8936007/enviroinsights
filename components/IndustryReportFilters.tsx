"use client";

import { useState } from "react";
import {
  BarChart3,
  CalendarDays,
  Check,
  ChevronDown,
  FileText,
  FileSpreadsheet,
  ChevronsUpDown,
  Table as TableIcon,
  LineChart as LineChartIcon,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import "../app/industry-reports.css";

const reportOptions = [
  "Average Report",
  "Detailed Report",
  "Compliance Report",
  "Daily Summary Report",
  "Monthly Performance Report",
  "Parameter Exceedance Report",
];
const stationOptions = [
  "Boiler Stack",
  "Monitoring Station",
  "Air Quality Station",
  "Water Monitoring Station",
  "Effluent Treatment Plant",
];
const monitoringOptions = ["Emission", "Effluent", "Ambient Air", "Water Quality"];
const parameterOptions = [
  "Boiler Stack - PM (mg/Nm3)",
  "Boiler Stack - NOx (mg/Nm3)",
  "Boiler Stack - SO2 (mg/Nm3)",
];
const intervalOptions = ["1 Hour", "15 Minutes", "30 Minutes", "1 Day", "1 Week"];

interface ReportRow {
  id: string;
  date: string;
  value: number;
}

const REPORT_DATASET: ReportRow[] = [
  { id: "1", date: "14-09-2026 00:00", value: 10 },
  { id: "2", date: "14-09-2026 01:00", value: 10 },
  { id: "3", date: "14-09-2026 02:00", value: 9.697 },
  { id: "4", date: "14-09-2026 03:00", value: 1.618 },
  { id: "5", date: "14-09-2026 04:00", value: 10 },
  { id: "6", date: "14-09-2026 05:00", value: 10 },
  { id: "7", date: "14-09-2026 06:00", value: 10 },
  { id: "8", date: "14-09-2026 07:00", value: 10 },
  { id: "9", date: "14-09-2026 08:00", value: 5.205 },
  { id: "10", date: "14-09-2026 09:00", value: 0.718 },
];

interface SelectFieldProps {
  label: string;
  value: string;
  options: string[];
  required?: boolean;
  open: boolean;
  onToggle: () => void;
  onChange: (value: string) => void;
}

function SelectField({
  label,
  value,
  options,
  required,
  open,
  onToggle,
  onChange,
}: SelectFieldProps) {
  return (
    <div className="report-field">
      <span>
        {required && <b>*</b>}
        {label}
      </span>
      <div className={`report-select-wrap ${open ? "open" : ""}`}>
        <button
          type="button"
          className="report-select-trigger"
          onClick={onToggle}
          aria-expanded={open}
          aria-haspopup="listbox"
        >
          <span>{value}</span>
          <ChevronDown size={17} aria-hidden="true" />
        </button>
        {open && (
          <div className="report-select-menu" role="listbox" aria-label={label}>
            {options.map((option) => (
              <button
                key={option}
                type="button"
                role="option"
                aria-selected={option === value}
                className={option === value ? "selected" : ""}
                onClick={() => onChange(option)}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function IndustryReportFilters() {
  const [report, setReport] = useState(reportOptions[0]);
  const [station, setStation] = useState(stationOptions[0]);
  const [monitoringType, setMonitoringType] = useState(monitoringOptions[0]);
  const [parameter, setParameter] = useState(parameterOptions[0]);
  const [interval, setInterval] = useState(intervalOptions[0]);
  const [startDate, setStartDate] = useState("2026-09-14T00:00");
  const [endDate, setEndDate] = useState("2026-09-14T05:00");
  const [showSummary, setShowSummary] = useState(true);
  const [generated, setGenerated] = useState(false); // Report view hidden until Generate Report clicked
  const [viewMode, setViewMode] = useState<"table" | "chart">("table");
  const [sortAsc, setSortAsc] = useState<boolean>(true);
  const [openField, setOpenField] = useState<string | null>(null);

  const toggleField = (field: string) => {
    setOpenField((current) => (current === field ? null : field));
  };

  const selectValue = (setter: (value: string) => void, value: string) => {
    setter(value);
    setOpenField(null);
  };

  const sortedData = [...REPORT_DATASET].sort((a, b) => {
    if (sortAsc) return a.date.localeCompare(b.date);
    return b.date.localeCompare(a.date);
  });

  const handleExport = (format: "pdf" | "csv" | "excel") => {
    const filename = `Industry_Report_${parameter.replace(/[^a-zA-Z0-9]/g, "_")}.${format === "excel" ? "xlsx" : format}`;
    
    let content = "";
    if (format === "csv" || format === "excel") {
      content = `Date,${parameter}\n` + sortedData.map(r => `"${r.date}",${r.value}`).join("\n");
      const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert(`Exporting ${format.toUpperCase()} report: ${filename}`);
    }
  };

  return (
    <section className="industry-report-card">
      <div className="report-field-grid">
        <SelectField
          label="Select Report"
          value={report}
          options={reportOptions}
          open={openField === "report"}
          onToggle={() => toggleField("report")}
          onChange={(value) => selectValue(setReport, value)}
        />
        <SelectField
          label="Station"
          required
          value={station}
          options={stationOptions}
          open={openField === "station"}
          onToggle={() => toggleField("station")}
          onChange={(value) => selectValue(setStation, value)}
        />
        <SelectField
          label="Monitoring Type"
          required
          value={monitoringType}
          options={monitoringOptions}
          open={openField === "monitoring"}
          onToggle={() => toggleField("monitoring")}
          onChange={(value) => selectValue(setMonitoringType, value)}
        />
        <SelectField
          label="Parameter"
          required
          value={parameter}
          options={parameterOptions}
          open={openField === "parameter"}
          onToggle={() => toggleField("parameter")}
          onChange={(value) => selectValue(setParameter, value)}
        />
      </div>

      <div className="report-options-row">
        <div className="date-range-field">
          <span className="report-option-label">
            Date Range
            <button type="button" onClick={() => setStartDate("2026-09-14T00:00")}>
              1D
            </button>
            <button type="button" onClick={() => setStartDate("2026-09-07T00:00")}>
              7D
            </button>
            <button type="button" onClick={() => setStartDate("2026-08-14T00:00")}>
              30D
            </button>
          </span>
          <div className="date-inputs">
            <label>
              <input
                type="datetime-local"
                value={startDate}
                onChange={(event) => setStartDate(event.target.value)}
                aria-label="Start date"
              />
              <CalendarDays size={16} aria-hidden="true" />
            </label>
            <span className="date-arrow">→</span>
            <label>
              <input
                type="datetime-local"
                value={endDate}
                onChange={(event) => setEndDate(event.target.value)}
                aria-label="End date"
              />
              <CalendarDays size={16} aria-hidden="true" />
            </label>
          </div>
        </div>

        <SelectField
          label="Time Interval"
          value={interval}
          options={intervalOptions}
          open={openField === "interval"}
          onToggle={() => toggleField("interval")}
          onChange={(value) => selectValue(setInterval, value)}
        />

        <label className="summary-toggle">
          <input
            type="checkbox"
            checked={showSummary}
            onChange={(event) => setShowSummary(event.target.checked)}
          />
          <span className="summary-checkbox" aria-hidden="true">
            {showSummary && <Check size={14} strokeWidth={3} />}
          </span>
          <span>Show Min/Max/Avg</span>
        </label>
      </div>

      {/* Action Row with Generate Report, PDF, CSV, Excel (Screenshot Match) */}
      <div className="report-actions-row">
        <button
          type="button"
          className="generate-report-button"
          onClick={() => setGenerated(true)}
          style={{ marginTop: 0 }}
        >
          <BarChart3 size={17} />
          <span>Generate Report</span>
        </button>

        <button
          type="button"
          className="export-button"
          onClick={() => handleExport("pdf")}
        >
          <FileText size={16} />
          <span>PDF</span>
        </button>

        <button
          type="button"
          className="export-button"
          onClick={() => handleExport("csv")}
        >
          <FileSpreadsheet size={16} />
          <span>CSV</span>
        </button>

        <button
          type="button"
          className="export-button"
          onClick={() => handleExport("excel")}
        >
          <FileSpreadsheet size={16} />
          <span>Excel</span>
        </button>
      </div>

      {/* Report View Tabs: Table vs Chart (Screenshot Match) */}
      {generated && (
        <>
          <div className="report-view-tabs">
            <button
              type="button"
              className={`report-tab-btn ${viewMode === "table" ? "active" : ""}`}
              onClick={() => setViewMode("table")}
            >
              <TableIcon size={16} />
              <span>Table</span>
            </button>
            <button
              type="button"
              className={`report-tab-btn ${viewMode === "chart" ? "active" : ""}`}
              onClick={() => setViewMode("chart")}
            >
              <LineChartIcon size={16} />
              <span>Chart</span>
            </button>
          </div>

          {/* Report Output Content */}
          <div className="report-output-container">
            {viewMode === "table" ? (
              <div className="report-table-wrapper">
                <table className="report-table">
                  <thead>
                    <tr>
                      <th onClick={() => setSortAsc((prev) => !prev)}>
                        <div className="th-content">
                          <span>Date</span>
                          <ChevronsUpDown size={15} />
                        </div>
                      </th>
                      <th onClick={() => setSortAsc((prev) => !prev)}>
                        <div className="th-content">
                          <span>{parameter}</span>
                          <ChevronsUpDown size={15} />
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedData.map((row) => (
                      <tr key={row.id}>
                        <td>{row.date}</td>
                        <td className="font-semibold">{row.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="report-chart-container">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={sortedData}
                    margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
                  >
                    <defs>
                      <linearGradient id="reportGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#209cc0" stopOpacity={0.35} />
                        <stop offset="95%" stopColor="#209cc0" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
                    <YAxis stroke="#64748b" fontSize={12} />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#209cc0"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#reportGradient)"
                      dot={{ r: 4, fill: "#209cc0" }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </>
      )}
    </section>
  );
}