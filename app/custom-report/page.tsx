import UploaderStatusReport from "@/components/UploaderStatusReport";
import "../dashboard.css";
import "../custom-report.css";

export default function CustomReportPage() {
  return (
    <div className="custom-report-container">
      <UploaderStatusReport />

      {/* Footer */}
      <footer className="dashboard-footer">
        <span>© 2026 Enviro Insights. All rights reserved.</span>
        <span>A Cleaner Tomorrow 🌱</span>
      </footer>
    </div>
  );
}
