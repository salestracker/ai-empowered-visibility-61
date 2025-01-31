import { Activity } from "lucide-react";

const activities = [
  {
    id: 1,
    title: "New order received",
    description: "Order #1234 from John Doe",
    time: "5 minutes ago",
  },
  {
    id: 2,
    title: "Inventory update",
    description: "Stock level updated for 15 items",
    time: "1 hour ago",
  },
  {
    id: 3,
    title: "Payment received",
    description: "Payment of $1,500 received for Invoice #5678",
    time: "2 hours ago",
  },
];

export function ActivityFeed() {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200">
      <div className="flex items-center gap-2 mb-6">
        <Activity className="w-5 h-5 text-gray-400" />
        <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
      </div>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex gap-4">
            <div className="w-2 h-2 mt-2 rounded-full bg-blue-600" />
            <div>
              <h3 className="text-sm font-medium text-gray-900">
                {activity.title}
              </h3>
              <p className="text-sm text-gray-500">{activity.description}</p>
              <span className="text-xs text-gray-400">{activity.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}