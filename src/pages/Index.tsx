import { DollarSign, Users, Package, TrendingUp } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { StatCard } from "@/components/StatCard";
import { ActivityFeed } from "@/components/ActivityFeed";
import { AiInsights } from "@/components/AiInsights";

const Index = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">Dashboard Overview</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Revenue"
              value="$24,500"
              icon={DollarSign}
              trend={{ value: "8%", positive: true }}
            />
            <StatCard
              title="Customers"
              value="1,250"
              icon={Users}
              trend={{ value: "12%", positive: true }}
            />
            <StatCard
              title="Products"
              value="450"
              icon={Package}
              trend={{ value: "3%", positive: false }}
            />
            <StatCard
              title="Growth"
              value="28.5%"
              icon={TrendingUp}
              trend={{ value: "5%", positive: true }}
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ActivityFeed />
            <AiInsights />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;