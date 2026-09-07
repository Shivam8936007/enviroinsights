"use client";

import {
  BarChart3,
  CalendarDays,
  Check,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";

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
  const [startDate, setStartDate] = useState("2026-09-07T00:00");
  const [endDate, setEndDate] = useState("2026-09-07T16:00");
  const [showSummary, setShowSummary] = useState(true);
  const [generated, setGenerated] = useState(false);
  const [openField, setOpenField] = useState<string | null>(null);

  const toggleField = (field: string) => {
    setOpenField((current) => (current === field ? null : field));
  };

  const selectValue = (setter: (value: string) => void, value: string) => {
    setter(value);
    setOpenField(null);
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
            <button type="button" onClick={() => setStartDate("2026-09-07T00:00")}>
              1D
            </button>
            <button type="button" onClick={() => setStartDate("2026-09-06T00:00")}>
              7D
            </button>
            <button type="button" onClick={() => setStartDate("2026-08-08T00:00")}>
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

      <button
        type="button"
        className="generate-report-button"
        onClick={() => setGenerated(true)}
      >
        <BarChart3 size={17} />
        {generated ? "Report Generated" : "Generate Report"}
      </button>
    </section>
  );
}