import { DollarSign, Users, Package, TrendingUp, ShoppingCart, Truck, Box, AlertTriangle } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { StatCard } from "@/components/StatCard";
import { ActivityFeed } from "@/components/ActivityFeed";
import { AiInsights } from "@/components/AiInsights";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("Dashboard");
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

  const renderContent = () => {
    switch (activeSection) {
      case "Analytics":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">E-commerce Analytics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-white rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Sales Performance</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Conversion Rate</span>
                    <span className="font-medium">3.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Average Order Value</span>
                    <span className="font-medium">$85.50</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cart Abandonment Rate</span>
                    <span className="font-medium">68%</span>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-white rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Inventory Health</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Stock Turnover Rate</span>
                    <span className="font-medium">4.5x</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Low Stock Items</span>
                    <span className="font-medium">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dead Stock Value</span>
                    <span className="font-medium">$5,240</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case "Inventory":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Inventory Management</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-white rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Low Stock Alert</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-red-50 rounded-lg">
                    <p className="text-red-700 font-medium">5 items below reorder point</p>
                    <ul className="mt-2 space-y-2">
                      <li className="text-sm">Product A - 2 units left</li>
                      <li className="text-sm">Product B - 3 units left</li>
                      <li className="text-sm">Product C - 1 unit left</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-white rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Incoming Shipments</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-blue-700 font-medium">3 shipments arriving soon</p>
                    <ul className="mt-2 space-y-2">
                      <li className="text-sm">Shipment #123 - ETA 2 days</li>
                      <li className="text-sm">Shipment #124 - ETA 4 days</li>
                      <li className="text-sm">Shipment #125 - ETA 1 week</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-white rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Storage Utilization</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-700 font-medium">Warehouse Capacity</p>
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                      <p className="text-sm mt-1">75% utilized</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
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
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50" role="application">
      {/* Mobile Header with Burger Menu */}
      <header className="sticky top-0 z-40 md:hidden bg-white border-b border-gray-200">
        <button
          type="button"
          className="p-4 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={isSidebarOpen}
          aria-controls="sidebar"
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4 6h16M4 12h16M4 18h16" 
            />
          </svg>
        </button>
      </header>
      
      {/* Sidebar */}
      <div 
        id="sidebar"
        className={`${isSidebarOpen ? 'block' : 'hidden'} md:block fixed inset-0 z-30 md:relative md:inset-auto`}
        role="navigation"
      >
        <div 
          className="absolute inset-0 bg-gray-600 bg-opacity-75 md:hidden" 
          onClick={() => setIsSidebarOpen(false)}
          role="presentation"
        />
        <div className="relative h-full">
          <Sidebar />
        </div>
      </div>
      
      {/* Main Content */}
      <main 
        className="flex-1 p-4 md:p-8 overflow-y-auto"
        role="main"
        aria-label="Dashboard content"
      >
        <div className="max-w-7xl mx-auto">
          {renderContent()}
          {!isOnline && (
            <div 
              role="alert"
              aria-live="polite"
              className="fixed bottom-4 right-4 bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded"
            >
              You're currently offline. Some features may be limited.
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
