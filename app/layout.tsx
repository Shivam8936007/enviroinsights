import Navbar from "@/components/Navbar";
import ThemeProvider from "@/components/ThemeProvider";
import UtilityTabs from "@/components/UtilityTabs";
import type { Metadata } from "next";
import "./globals.css";
import "./dashboard.css";

export const metadata: Metadata = {
  title: "Enviro Insights",
  icons: {
    icon: "/Enviro.png",
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>

        
        <ThemeProvider>
          <div className="dashboard-layout">
            <Navbar />
            <UtilityTabs />

            <main className="dashboard-content">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}