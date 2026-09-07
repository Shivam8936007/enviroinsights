import Navbar from "@/components/Navbar";
import UtilityTabs from "@/components/UtilityTabs";
import "./dashboard.css";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="dashboard-layout">
          <Navbar />
          <UtilityTabs />

          <main className="dashboard-content">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}