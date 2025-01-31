import { ShoppingCart, Truck, Box, AlertTriangle } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { ActivityFeed } from "@/components/ActivityFeed";
import { AiInsights } from "@/components/AiInsights";

export function DashboardSection() {
  return (
    <>
      <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 md:mb-8">
        E-commerce Operations Dashboard
      </h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        <StatCard
          title="Daily Orders"
          value="156"
          icon={ShoppingCart}
          trend={{ value: "12%", positive: true }}
        />
        <StatCard
          title="Pending Shipments"
          value="45"
          icon={Truck}
          trend={{ value: "8%", positive: false }}
        />
        <StatCard
          title="Low Stock Items"
          value="12"
          icon={Box}
          trend={{ value: "3", positive: false, description: "items" }}
        />
        <StatCard
          title="Returns Rate"
          value="2.4%"
          icon={AlertTriangle}
          trend={{ value: "0.5%", positive: true }}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <ActivityFeed />
        <AiInsights />
      </div>
    </>
  );
}