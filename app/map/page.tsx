"use client";

import dynamic from "next/dynamic";
import "../map.css";

const EnviroMap = dynamic(
  () => import("@/components/EnviroMap"),
  {
    ssr: false,
    loading: () => (
      <div className="map-loading">
        <div className="loading-spinner"></div>
        <span>Loading Map...</span>
      </div>
    ),
  }
);

export default function MapPage() {
  return (
    <div className="map-page">

      {/* Page Header */}
      <div className="map-page-header">

        <div>
          <h1>Map View</h1>

          <p>
            Monitor environmental stations and locations
          </p>
        </div>

        <div className="map-status">
          <span className="status-dot"></span>
          Live Monitoring
        </div>

      </div>

      {/* Map */}
      <div className="map-card">
        <EnviroMap />
      </div>

    </div>
  );
}