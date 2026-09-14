import CompanyHeader from "@/components/CompanyHeader";
import RealTimeOverview from "@/components/RealTimeOverview";
import "../dashboard.css";
import "../realtime.css";

export default function RealTimePage() {
  return (
    <div className="realtime-container">
      <CompanyHeader />

      <RealTimeOverview />

      {/* Footer */}
      <footer className="dashboard-footer">
        <span>© 2026 Enviro Insights. All rights reserved.</span>
        <span>A Cleaner Tomorrow 🌱</span>
      </footer>
    </div>
  );
}
