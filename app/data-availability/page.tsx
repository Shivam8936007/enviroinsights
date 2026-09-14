import DataAvailabilityTable from "@/components/DataAvailabilityTable";
import "../dashboard.css";
import "../data-availability.css";

export default function DataAvailabilityPage() {
  return (
    <div className="data-availability-container">
      <DataAvailabilityTable />

      {/* Footer */}
      <footer className="dashboard-footer">
        <span>© 2026 Enviro Insights. All rights reserved.</span>
        <span>A Cleaner Tomorrow 🌱</span>
      </footer>
    </div>
  );
}
