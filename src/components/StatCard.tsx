import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    positive: boolean;
  };
}

export function StatCard({ title, value, icon: Icon, trend }: StatCardProps) {
  return (
    <div className="bg-white p-4 md:p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-3 md:mb-4">
        <h3 className="text-gray-500 text-sm font-medium truncate">{title}</h3>
        <Icon className="w-5 h-5 text-gray-400" />
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-lg md:text-2xl font-bold text-gray-900 truncate">{value}</span>
        {trend && (
          <span
            className={`text-xs md:text-sm font-medium ${
              trend.positive ? "text-green-600" : "text-red-600"
            }`}
          >
            {trend.positive ? "+" : "-"}{trend.value}
          </span>
        )}
      </div>
    </div>
  );
}