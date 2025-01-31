import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

const salesData = [
  { name: "Mon", value: 4000 },
  { name: "Tue", value: 3000 },
  { name: "Wed", value: 2000 },
  { name: "Thu", value: 2780 },
  { name: "Fri", value: 1890 },
  { name: "Sat", value: 2390 },
  { name: "Sun", value: 3490 },
];

export function AnalyticsSection() {
  const [timeframe, setTimeframe] = useState("week");
  const { toast } = useToast();

  const handleExport = () => {
    toast({
      title: "Report Export Started",
      description: "Your analytics report will be ready for download shortly.",
    });
  };

  const handleViewItems = () => {
    toast({
      title: "Low Stock Items",
      description: "Viewing 12 items that need restocking.",
    });
  };

  const handleManageStock = () => {
    toast({
      title: "Stock Management",
      description: "Opening stock management interface.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">E-commerce Analytics</h2>
        <div className="flex gap-4">
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={handleExport}>Export Report</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Sales Performance</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-4">
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
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex justify-between mb-2">
                <span>Stock Turnover Rate</span>
                <span className="font-medium">4.5x</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg">
              <div className="flex justify-between mb-2">
                <span>Low Stock Items</span>
                <span className="font-medium text-yellow-600">12 items</span>
              </div>
              <Button variant="outline" className="w-full mt-2" onClick={handleViewItems}>View Items</Button>
            </div>
            <div className="p-4 bg-red-50 rounded-lg">
              <div className="flex justify-between mb-2">
                <span>Dead Stock Value</span>
                <span className="font-medium text-red-600">$5,240</span>
              </div>
              <Button variant="outline" className="w-full mt-2" onClick={handleManageStock}>Manage Stock</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}