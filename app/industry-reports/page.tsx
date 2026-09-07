import CompanyHeader from "@/components/CompanyHeader";
import IndustryReportFilters from "@/components/IndustryReportFilters";

export default function IndustryReportsPage() {
  return (
    <div className="dashboard-page industry-reports-page">
      <CompanyHeader />
      <IndustryReportFilters />

      <footer className="dashboard-footer">
        <span>© 2026 Enviro Insights. All rights reserved.</span>
        <span>A Cleaner Tomorrow 🌱</span>
      </footer>
    </div>
  );
}