import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const salesData = [
  { name: "Mon", value: 4000 },
  { name: "Tue", value: 3000 },
  { name: "Wed", value: 2000 },
  { name: "Thu", value: 2780 },
  { name: "Fri", value: 1890 },
  { name: "Sat", value: 2390 },
  { name: "Sun", value: 3490 },
];

const lowStockItems = [
  { name: "Product A", stock: 2, reorderPoint: 5 },
  { name: "Product B", stock: 1, reorderPoint: 10 },
  { name: "Product C", stock: 3, reorderPoint: 8 },
];

export function AnalyticsSection() {
  const [timeframe, setTimeframe] = useState("week");
  const [showLowStockDialog, setShowLowStockDialog] = useState(false);
  const [showStockManagementDialog, setShowStockManagementDialog] = useState(false);
  const { toast } = useToast();

  const handleExport = () => {
    // Simulate creating and downloading a CSV file
    const csvContent = "data:text/csv;charset=utf-8,Date,Sales\n" + 
      salesData.map(row => `${row.name},${row.value}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `sales_report_${timeframe}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Report Exported",
      description: `Sales report for ${timeframe} has been downloaded.`,
    });
  };

  const handleViewItems = () => {
    setShowLowStockDialog(true);
  };

  const handleManageStock = () => {
    setShowStockManagementDialog(true);
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

      <Dialog open={showLowStockDialog} onOpenChange={setShowLowStockDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Low Stock Items</DialogTitle>
            <DialogDescription>
              The following items are below their reorder points and need attention.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {lowStockItems.map((item, index) => (
              <div key={index} className="p-4 bg-yellow-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-gray-500">Current Stock: {item.stock}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Reorder Point: {item.reorderPoint}</p>
                    <p className="text-yellow-600 font-medium">Action Required</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showStockManagementDialog} onOpenChange={setShowStockManagementDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Stock Management</DialogTitle>
            <DialogDescription>
              Review and manage dead stock items to optimize inventory.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-white border rounded-lg">
              <h4 className="font-medium mb-2">Dead Stock Analysis</h4>
              <p className="text-sm text-gray-500 mb-4">Items with no movement in the last 90 days</p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Total Items</span>
                  <span className="font-medium">24</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Value</span>
                  <span className="font-medium text-red-600">$5,240</span>
                </div>
                <div className="flex justify-between">
                  <span>Storage Cost (Monthly)</span>
                  <span className="font-medium">$420</span>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}