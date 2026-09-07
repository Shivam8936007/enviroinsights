"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
} from "react-leaflet";

import L from "leaflet";

import "leaflet/dist/leaflet.css";
import "../app/map.css";

interface Station {
  id: number;
  name: string;
  location: string;
  parameter: string;
  value: string;
  status: "good" | "warning" | "offline";
  position: [number, number];
}

const stations: Station[] = [
  {
    id: 1,
    name: "Boiler Stack",
    location: "Aroma Delights Pvt Ltd",
    parameter: "PM",
    value: "10.0 mg/Nm3",
    status: "good",
    position: [29.6857, 76.9905],
  },

  {
    id: 2,
    name: "Monitoring Station",
    location: "Karnal Industrial Area",
    parameter: "PM",
    value: "12.4 mg/Nm3",
    status: "good",
    position: [29.7055, 76.9845],
  },

  {
    id: 3,
    name: "Air Quality Station",
    location: "Haryana Monitoring Point",
    parameter: "NOx",
    value: "42 µg/m³",
    status: "warning",
    position: [29.6685, 77.006],
  },

  {
    id: 4,
    name: "Water Monitoring",
    location: "Karnal Water Point",
    parameter: "Water Quality",
    value: "92",
    status: "good",
    position: [29.675, 76.970],
  },
];


/*
 * Custom marker
 */
function createMarkerIcon(
  status: Station["status"]
) {

  return L.divIcon({
    className: "enviro-marker-wrapper",

    html: `
      <div class="enviro-marker ${status}">

        <div class="marker-pulse"></div>

        <div class="marker-icon">
          <span>♟</span>
        </div>

        <div class="marker-shadow"></div>

      </div>
    `,

    iconSize: [50, 70],

    iconAnchor: [25, 60],

    popupAnchor: [0, -55],
  });
}


export default function EnviroMap() {

  /*
   * Karnal center
   */
  const center: [number, number] = [
    29.6857,
    76.9905,
  ];

  return (
    <div className="enviro-map">

      <MapContainer
        center={center}
        zoom={12}
        zoomControl={false}
        scrollWheelZoom={true}
        className="leaflet-map"
      >

        {/* OpenStreetMap */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <ZoomControl position="bottomright" />

        {/* Station Markers */}
        {stations.map((station, index) => (

          <Marker
            key={station.id}
            position={station.position}
            icon={createMarkerIcon(station.status)}
            eventHandlers={{
              add: (event) => {

                const marker =
                  event.target.getElement();

                if (marker) {
                  marker.style.animationDelay =
                    `${index * 0.15}s`;
                }
              },
            }}
          >

            <Popup>

              <div className="station-popup">

                <div className="popup-header">

                  <div className="popup-icon">
                    {station.status === "good"
                      ? "✓"
                      : "!"}
                  </div>

                  <div>
                    <h3>{station.name}</h3>

                    <p>{station.location}</p>
                  </div>

                </div>

                <div className="popup-divider"></div>

                <div className="popup-data">

                  <div>
                    <span>Parameter</span>
                    <strong>
                      {station.parameter}
                    </strong>
                  </div>

                  <div>
                    <span>Current Value</span>
                    <strong>
                      {station.value}
                    </strong>
                  </div>

                </div>

                <div
                  className={`popup-status ${station.status}`}
                >
                  <span></span>

                  {station.status === "good"
                    ? "Normal"
                    : station.status === "warning"
                    ? "Attention Required"
                    : "Offline"}
                </div>

              </div>

            </Popup>

          </Marker>

        ))}

      </MapContainer>


      {/* Map Overlay */}
      <div className="map-overlay">

        <div className="map-filter">

          <span className="filter-icon">
            ◉
          </span>

          <div>
            <small>LOCATION</small>
            <strong>Karnal, Haryana</strong>
          </div>

        </div>

      </div>


      {/* Legend */}
      <div className="map-legend">

        <div className="legend-title">
          Monitoring Status
        </div>

        <div className="legend-item">
          <span className="legend-dot good"></span>
          Normal
        </div>

        <div className="legend-item">
          <span className="legend-dot warning"></span>
          Attention
        </div>

        <div className="legend-item">
          <span className="legend-dot offline"></span>
          Offline
        </div>

      </div>

    </div>
  );
}