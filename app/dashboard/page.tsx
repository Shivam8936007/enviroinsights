import CompanyHeader from "@/components/CompanyHeader";
import StatCard from "@/components/StatCard";
import MonitoringChart from "@/components/MonitoringChart";
import ParameterPanel from "@/components/ParameterPanel";

export default function DashboardPage() {
  return (
    <div className="dashboard-page">

      <CompanyHeader />

      {/* Statistics */}
      <section className="stats-grid">

        <StatCard
          title="Total Monitoring Stations"
          value="1"
          icon="station"
        />

        <StatCard
          title="Total Parameter Monitored"
          value="1"
          icon="parameter"
        />

        <StatCard
          title="Total Exceeding Parameter"
          value="0"
          icon="warning"
        />

        <StatCard
          title="Overall Data Availability"
          value="100%"
          icon="availability"
          highlight
        />

        <StatCard
          title="Device Availability"
          value="0"
          icon="device"
        />

      </section>

      {/* Main content */}
      <section className="monitoring-grid">

        <MonitoringChart />

        <ParameterPanel />

      </section>

      {/* Footer */}
      <footer className="dashboard-footer">
        <span>
          © 2026 Enviro Alignment LLP. All rights reserved.
        </span>

        <span>
          A Cleaner Tomorrow 🌱
        </span>
      </footer>

    </div>
  );
}