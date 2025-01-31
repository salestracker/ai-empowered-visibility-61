export function InventorySection() {
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
}