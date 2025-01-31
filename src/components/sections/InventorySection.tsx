import { DeadStockManagement } from "@/components/inventory/DeadStockManagement";

export function InventorySection() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Inventory Management</h2>
      <DeadStockManagement />
    </div>
  );
}