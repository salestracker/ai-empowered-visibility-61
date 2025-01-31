import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const initialInventoryItems = [
  { id: 1, name: "Product A", stock: 2, status: "low", category: "Electronics" },
  { id: 2, name: "Product B", stock: 15, status: "normal", category: "Clothing" },
  { id: 3, name: "Product C", stock: 8, status: "normal", category: "Electronics" },
  { id: 4, name: "Product D", stock: 1, status: "critical", category: "Accessories" },
];

export function InventorySection() {
  const [inventoryItems, setInventoryItems] = useState(initialInventoryItems);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState<typeof inventoryItems[0] | null>(null);
  const [showItemDetails, setShowItemDetails] = useState(false);
  const [showNewItemDialog, setShowNewItemDialog] = useState(false);
  const [newItem, setNewItem] = useState({
    name: "",
    stock: "",
    category: "Electronics",
  });
  const { toast } = useToast();

  const handleAddNewItem = () => {
    setNewItem({
      name: "",
      stock: "",
      category: "Electronics",
    });
    setShowNewItemDialog(true);
  };

  const handleSaveNewItem = () => {
    if (!newItem.name || !newItem.stock) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const stockNum = parseInt(newItem.stock);
    const status = stockNum <= 2 ? "critical" : stockNum <= 5 ? "low" : "normal";

    const item = {
      id: inventoryItems.length + 1,
      name: newItem.name,
      stock: stockNum,
      status,
      category: newItem.category,
    };

    setInventoryItems([...inventoryItems, item]);
    setShowNewItemDialog(false);
    toast({
      title: "Success",
      description: "New item added successfully",
    });
  };

  const handleUpdateStock = () => {
    if (!selectedItem) return;
    
    const newStock = parseInt(prompt("Enter new stock quantity:", selectedItem.stock.toString()) || "0");
    if (isNaN(newStock) || newStock < 0) {
      toast({
        title: "Error",
        description: "Please enter a valid number",
        variant: "destructive",
      });
      return;
    }
    
    const updatedItems = inventoryItems.map(item => {
      if (item.id === selectedItem.id) {
        const status = newStock <= 2 ? "critical" : newStock <= 5 ? "low" : "normal";
        return { ...item, stock: newStock, status };
      }
      return item;
    });
    
    setInventoryItems(updatedItems);
    setSelectedItem(null);
    setShowItemDetails(false);
    toast({
      title: "Stock Updated",
      description: `Updated stock for ${selectedItem.name} to ${newStock} units`,
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
                <div className="p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100" onClick={handleUpdateStock}>
                  <h4 className="font-medium mb-2">Stock Level</h4>
                  <p className="text-2xl font-bold">{selectedItem.stock} units</p>
                  <p className="text-sm text-gray-500 mt-1">Click to update</p>
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

      <Dialog open={showNewItemDialog} onOpenChange={setShowNewItemDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Item</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Item Name</Label>
              <Input
                id="name"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                placeholder="Enter item name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stock">Initial Stock</Label>
              <Input
                id="stock"
                type="number"
                value={newItem.stock}
                onChange={(e) => setNewItem({ ...newItem, stock: e.target.value })}
                placeholder="Enter initial stock"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={newItem.category}
                onValueChange={(value) => setNewItem({ ...newItem, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Electronics">Electronics</SelectItem>
                  <SelectItem value="Clothing">Clothing</SelectItem>
                  <SelectItem value="Accessories">Accessories</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewItemDialog(false)}>Cancel</Button>
            <Button onClick={handleSaveNewItem}>Save Item</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
