"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Area,
} from "recharts";

import { BarChart3, Table, Maximize2 } from "lucide-react";

const data = [
  {
    time: "15:30",
    value: 10,
  },
  {
    time: "16:00",
    value: 10,
  },
  {
    time: "16:30",
    value: 10,
  },
  {
    time: "17:00",
    value: 10,
  },
  {
    time: "17:30",
    value: 10,
  },
  {
    time: "18:00",
    value: 10,
  },
  {
    time: "18:30",
    value: 10,
  },
  {
    time: "19:00",
    value: 10,
  },
  {
    time: "19:30",
    value: 10,
  },
  {
    time: "20:00",
    value: 10,
  },
];

export default function MonitoringChart() {
  return (
    <div className="chart-card">

      <div className="chart-header">

        <div>
          <h2>Boiler Stack - PM</h2>

          <p>
            15 Minutes Average of PM
          </p>
        </div>

        <div className="chart-actions">

          <button className="chart-button active">
            <BarChart3 size={17} />
            Graph
          </button>

          <button className="chart-button">
            <Table size={17} />
            Table
          </button>

        </div>

      </div>

      <div className="chart-legend">
        <span className="legend-line"></span>
        <span>PM</span>
      </div>

      <div className="chart-wrapper">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <LineChart
            data={data}
            margin={{
              top: 15,
              right: 20,
              left: 10,
              bottom: 20,
            }}
          >

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="time"
              tick={{ fontSize: 12 }}
            />

            <YAxis
              domain={[0, 10]}
              tick={{ fontSize: 12 }}
              label={{
                value: "mg/Nm3",
                angle: -90,
                position: "insideLeft",
              }}
            />

            <Area
              type="monotone"
              dataKey="value"
              fill="#d9f2fb"
              stroke="none"
            />

            <Line
              type="monotone"
              dataKey="value"
              stroke="#299fc7"
              strokeWidth={2}
              dot={false}
            />

          </LineChart>
        </ResponsiveContainer>

      </div>

      <div className="chart-tools">

        <button>
          <Maximize2 size={17} />
        </button>

        <button>↻</button>

        <button>⇩</button>

      </div>

      <div className="chart-x-title">
        Timestamp
      </div>

    </div>
  );
}