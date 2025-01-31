import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

const inventoryItems = [
  { id: 1, name: "Product A", stock: 2, status: "low", category: "Electronics" },
  { id: 2, name: "Product B", stock: 15, status: "normal", category: "Clothing" },
  { id: 3, name: "Product C", stock: 8, status: "normal", category: "Electronics" },
  { id: 4, name: "Product D", stock: 1, status: "critical", category: "Accessories" },
];

export function InventorySection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState<typeof inventoryItems[0] | null>(null);
  const [showItemDetails, setShowItemDetails] = useState(false);
  const { toast } = useToast();

  const handleAddNewItem = () => {
    toast({
      title: "Add New Item",
      description: "Opening new item form...",
    });
  };

  const handleUpdateStock = () => {
    toast({
      title: "Stock Updated",
      description: `Updated stock for ${selectedItem?.name}`,
    });
  };

  const handleViewHistory = () => {
    toast({
      title: "Item History",
      description: `Viewing history for ${selectedItem?.name}`,
    });
  };

  const filteredItems = inventoryItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "low":
        return "bg-yellow-100 text-yellow-800";
      case "critical":
        return "bg-red-100 text-red-800";
      default:
        return "bg-green-100 text-green-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Inventory Management</h2>
        <Button onClick={handleAddNewItem}>Add New Item</Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="Search inventory..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => {
              setSelectedItem(item);
              setShowItemDetails(true);
            }}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <Badge variant="secondary">{item.category}</Badge>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Current Stock</span>
                <span className="font-medium">{item.stock} units</span>
              </div>
              <div className="flex justify-between">
                <span>Status</span>
                <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(item.status)}`}>
                  {item.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={showItemDetails} onOpenChange={setShowItemDetails}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedItem?.name} Details</DialogTitle>
          </DialogHeader>
          {selectedItem && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2">Stock Level</h4>
                  <p className="text-2xl font-bold">{selectedItem.stock} units</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2">Category</h4>
                  <p className="text-2xl font-bold">{selectedItem.category}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button className="flex-1" onClick={handleUpdateStock}>Update Stock</Button>
                <Button variant="outline" className="flex-1" onClick={handleViewHistory}>View History</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}