import { Suspense } from "react";
import RealTimeDetail from "@/components/RealTimeDetail";
import "../../dashboard.css";
import "../../realtime.css";

export default function RealTimeDetailPage() {
  return (
    <div className="realtime-container">
      <Suspense
        fallback={
          <div className="p-8 text-center text-gray-500">
            Loading Real Time Parameter Data...
          </div>
        }
      >
        <RealTimeDetail />
      </Suspense>

      {/* Footer */}
      <footer className="dashboard-footer">
        <span>© 2026 Enviro Alignment LLP. All rights reserved.</span>
        <span>A Cleaner Tomorrow 🌱</span>
      </footer>
    </div>
  );
}
