import {
  Building2,
  CircleAlert,
  CircleCheck,
  CircleX,
  Monitor,
  FileText,
  TriangleAlert,
  BarChart3,
  Cpu,
} from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  icon: string;
  highlight?: boolean;
}

export default function StatCard({
  title,
  value,
  icon,
  highlight,
}: StatCardProps) {

  const icons: Record<string, React.ReactNode> = {
    site: <Building2 />,
    active: <CircleCheck />,
    partial: <CircleAlert />,
    inactive: <CircleX />,
    station: <Monitor />,
    parameter: <FileText />,
    warning: <TriangleAlert />,
    availability: <BarChart3 />,
    device: <Cpu />,
  };

  return (
    <div className="stat-card">

      <div className={`stat-icon ${icon}`}>
        {icons[icon]}
      </div>

      <div className="stat-content">

        <p>{title}</p>

        <strong
          className={highlight ? "highlight-value" : ""}
        >
          {value}
        </strong>

      </div>

    </div>
  );
}