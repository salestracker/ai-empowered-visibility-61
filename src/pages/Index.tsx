import { DollarSign, Users, Package, TrendingUp } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { StatCard } from "@/components/StatCard";
import { ActivityFeed } from "@/components/ActivityFeed";
import { AiInsights } from "@/components/AiInsights";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const { toast } = useToast();

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast({
        title: "Back online",
        description: "Your connection has been restored",
      });
    };

    const handleOffline = () => {
      setIsOnline(false);
      toast({
        title: "You're offline",
        description: "Some features may be limited",
        variant: "destructive",
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [toast]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <div className="md:hidden">
        <button
          type="button"
          className="p-4 text-gray-600"
          onClick={() => document.querySelector('[data-sidebar]')?.classList.toggle('hidden')}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      
      <div className="hidden md:block">
        <Sidebar />
      </div>
      
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 md:mb-8">Dashboard Overview</h1>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
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
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            <ActivityFeed />
            <AiInsights />
          </div>

          {!isOnline && (
            <div className="fixed bottom-4 right-4 bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
              You're currently offline. Some features may be limited.
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;