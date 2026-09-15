import SiteStatusTable from "@/components/SiteStatusTable";

export default function SiteStatusPage() {
  return (
    <div className="dashboard-page">
      <SiteStatusTable />

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