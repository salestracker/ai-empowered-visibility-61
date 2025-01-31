import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { NaturalLanguageQuery } from "@/components/NaturalLanguageQuery";

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

const deadStockItems = [
  { id: 1, name: "Product X", lastSold: "90+ days ago", value: 1200, quantity: 50, storageLocation: "Warehouse A" },
  { id: 2, name: "Product Y", lastSold: "120+ days ago", value: 2040, quantity: 30, storageLocation: "Warehouse B" },
  { id: 3, name: "Product Z", lastSold: "180+ days ago", value: 2000, quantity: 40, storageLocation: "Warehouse A" },
];

export function AnalyticsSection() {
  const [timeframe, setTimeframe] = useState("week");
  const [showLowStockDialog, setShowLowStockDialog] = useState(false);
  const [showStockManagementDialog, setShowStockManagementDialog] = useState(false);
  const { toast } = useToast();

  const handleExport = () => {
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

  const handleMarkForClearance = (itemId: number) => {
    toast({
      title: "Item Marked for Clearance",
      description: `Item ${itemId} has been marked for clearance sale.`,
    });
  };

  const handleMarkForDisposal = (itemId: number) => {
    toast({
      title: "Item Marked for Disposal",
      description: `Item ${itemId} has been marked for disposal.`,
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

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h3 className="text-lg font-semibold mb-4">Natural Language Analytics</h3>
        <NaturalLanguageQuery />
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
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Dead Stock Management</DialogTitle>
            <DialogDescription>
              Review and manage items with no movement in the last 90 days
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="p-4 bg-white border rounded-lg">
              <h4 className="font-medium mb-2">Dead Stock Summary</h4>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Total Items</p>
                  <p className="text-xl font-semibold">{deadStockItems.length}</p>
                </div>
                <div className="p-3 bg-red-50 rounded-lg">
                  <p className="text-sm text-gray-600">Total Value</p>
                  <p className="text-xl font-semibold text-red-600">
                    ${deadStockItems.reduce((acc, item) => acc + item.value, 0).toLocaleString()}
                  </p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <p className="text-sm text-gray-600">Total Units</p>
                  <p className="text-xl font-semibold">
                    {deadStockItems.reduce((acc, item) => acc + item.quantity, 0)}
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                {deadStockItems.map((item) => (
                  <div key={item.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h5 className="font-medium">{item.name}</h5>
                        <p className="text-sm text-gray-500">Last sold: {item.lastSold}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">${item.value.toLocaleString()}</p>
                        <p className="text-sm text-gray-500">{item.quantity} units</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mb-3">Location: {item.storageLocation}</p>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        className="text-yellow-600 border-yellow-600 hover:bg-yellow-50"
                        onClick={() => handleMarkForClearance(item.id)}
                      >
                        Mark for Clearance
                      </Button>
                      <Button 
                        variant="outline" 
                        className="text-red-600 border-red-600 hover:bg-red-50"
                        onClick={() => handleMarkForDisposal(item.id)}
                      >
                        Mark for Disposal
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
