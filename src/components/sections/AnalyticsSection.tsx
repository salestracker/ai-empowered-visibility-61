export function AnalyticsSection() {
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
}