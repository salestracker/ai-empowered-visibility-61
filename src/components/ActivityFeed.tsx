import { Activity, Package, DollarSign, Users, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const activities = [
  {
    id: 1,
    title: "New order received",
    description: "Order #1234 from John Doe - $1,500",
    time: "5 minutes ago",
    type: "order",
  },
  {
    id: 2,
    title: "Inventory update",
    description: "Stock level updated for 15 items in Warehouse A",
    time: "1 hour ago",
    type: "inventory",
  },
  {
    id: 3,
    title: "Payment received",
    description: "Payment of $1,500 received for Invoice #5678",
    time: "2 hours ago",
    type: "payment",
  },
  {
    id: 4,
    title: "New employee onboarded",
    description: "Sarah Smith joined the Sales department",
    time: "3 hours ago",
    type: "hr",
  },
  {
    id: 5,
    title: "System alert",
    description: "Database backup completed successfully",
    time: "4 hours ago",
    type: "system",
  }
];

const getActivityIcon = (type: string) => {
  switch (type) {
    case "order":
      return Package;
    case "payment":
      return DollarSign;
    case "hr":
      return Users;
    case "system":
      return AlertCircle;
    default:
      return Activity;
  }
};

export function ActivityFeed() {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200">
      <div className="flex items-center gap-2 mb-6">
        <Activity className="w-5 h-5 text-gray-400" />
        <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
      </div>
      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = getActivityIcon(activity.type);
          return (
            <div key={activity.id} className="flex gap-4">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-blue-600" />
                </div>
                {activity.id !== activities.length && (
                  <div className="absolute top-8 left-4 w-px h-4 bg-gray-200" />
                )}
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  {activity.title}
                </h3>
                <p className="text-sm text-gray-500">{activity.description}</p>
                <span className="text-xs text-gray-400">{activity.time}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}