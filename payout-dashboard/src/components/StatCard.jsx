import { ArrowUpRight } from "lucide-react";

function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
}) {
  return (
    <div className="stat-card">
      <div className="stat-top">
        <div className="stat-icon">
          <Icon size={21} />
        </div>

        <span className="trend">
          <ArrowUpRight size={14} />
          {trend}
        </span>
      </div>

      <p>{title}</p>

      <h2>{value}</h2>

      <span className="stat-subtitle">
        {subtitle}
      </span>
    </div>
  );
}

export default StatCard;