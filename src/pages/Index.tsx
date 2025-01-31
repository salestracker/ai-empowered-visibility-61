import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { MobileHeader } from "@/components/layout/MobileHeader";
import { DashboardSection } from "@/components/sections/DashboardSection";
import { AnalyticsSection } from "@/components/sections/AnalyticsSection";
import { InventorySection } from "@/components/sections/InventorySection";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";

const Index = () => {
  const [isOnline] = useState(navigator.onLine);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [isLoggedIn] = useState(false);

  const renderContent = () => {
    switch (activeSection) {
      case "Analytics":
        return <AnalyticsSection />;
      case "Inventory":
        return <InventorySection />;
      default:
        return <DashboardSection />;
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-white">
        <HeroSection />
        <FeaturesSection />
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50" role="application">
      <MobileHeader isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      
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
          <Sidebar 
            activeSection={activeSection} 
            onSectionChange={(section) => {
              setActiveSection(section);
              setIsSidebarOpen(false);
            }}
          />
        </div>
      </div>
      
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