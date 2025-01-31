import { Sparkles } from "lucide-react";

const insights = [
  {
    id: 1,
    title: "Sales Prediction",
    description: "Based on current trends, expect a 15% increase in sales next month.",
    confidence: 85,
  },
  {
    id: 2,
    title: "Inventory Alert",
    description: "3 items are predicted to go out of stock within 2 weeks.",
    confidence: 92,
  },
];

export function AiInsights() {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="w-5 h-5 text-blue-600" />
        <h2 className="text-lg font-semibold text-gray-900">AI Insights</h2>
      </div>
      <div className="space-y-4">
        {insights.map((insight) => (
          <div key={insight.id} className="p-4 bg-blue-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-900 mb-1">
              {insight.title}
            </h3>
            <p className="text-sm text-gray-600 mb-2">{insight.description}</p>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-gray-200 rounded-full">
                <div
                  className="h-2 bg-blue-600 rounded-full"
                  style={{ width: `${insight.confidence}%` }}
                />
              </div>
              <span className="text-xs text-gray-500">
                {insight.confidence}% confidence
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}