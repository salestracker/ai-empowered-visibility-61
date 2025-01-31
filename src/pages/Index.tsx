import { DollarSign, Users, Package, TrendingUp } from "lucide-react";
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
            <h2 className="text-2xl font-bold">Analytics Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-white rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Revenue Trends</h3>
                <p className="text-gray-600">Monthly revenue analysis and trends visualization would appear here.</p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">User Engagement</h3>
                <p className="text-gray-600">User activity and engagement metrics would be displayed here.</p>
              </div>
            </div>
          </div>
        );
      
      case "Customers":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Customer Management</h2>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Customers</h3>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between p-4 border rounded">
                    <div>
                      <p className="font-medium">Customer {i}</p>
                      <p className="text-sm text-gray-600">customer{i}@example.com</p>
                    </div>
                    <span className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded-full">Active</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      case "Inventory":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Inventory Management</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-6 bg-white rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-2">Product {i}</h3>
                  <p className="text-gray-600 mb-4">SKU: PRD-00{i}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Stock: {i * 50}</span>
                    <span className={`px-3 py-1 text-sm rounded-full ${
                      i * 50 > 100 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {i * 50 > 100 ? 'In Stock' : 'Low Stock'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case "Settings":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">System Settings</h2>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 border rounded">
                  <div>
                    <p className="font-medium">Notifications</p>
                    <p className="text-sm text-gray-600">Manage your notification preferences</p>
                  </div>
                  <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100">
                    Configure
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 border rounded">
                  <div>
                    <p className="font-medium">Security</p>
                    <p className="text-sm text-gray-600">Update security settings</p>
                  </div>
                  <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100">
                    Manage
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 border rounded">
                  <div>
                    <p className="font-medium">Appearance</p>
                    <p className="text-sm text-gray-600">Customize the interface</p>
                  </div>
                  <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100">
                    Customize
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 md:mb-8">
              Dashboard Overview
            </h1>
            
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
