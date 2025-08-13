interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export function StatsCard({ title, value, icon, trend }: StatsCardProps) {
  return (
    <div className="bg-card rounded-lg p-6 border border-gray-700">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-light-gray text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-white mt-2">{value}</p>
          {trend && (
            <div
              className={`flex items-center mt-2 text-sm ${
                trend.isPositive ? "text-green-500" : "text-tomato-red"
              }`}
            >
              <span>{trend.isPositive ? "↗" : "↘"}</span>
              <span className="ml-1">{Math.abs(trend.value)}%</span>
            </div>
          )}
        </div>
        <div className="text-primary text-2xl">{icon}</div>
      </div>
    </div>
  );
}
