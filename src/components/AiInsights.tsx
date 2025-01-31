import { Sparkles, TrendingUp, AlertTriangle, Brain } from "lucide-react";
import { cn } from "@/lib/utils";

const insights = [
  {
    id: 1,
    title: "Sales Prediction",
    description: "Based on current trends and seasonal patterns, expect a 15% increase in sales next month.",
    confidence: 85,
    type: "prediction",
    impact: "high",
  },
  {
    id: 2,
    title: "Inventory Alert",
    description: "3 items are predicted to go out of stock within 2 weeks. Recommended reorder quantity calculated.",
    confidence: 92,
    type: "alert",
    impact: "medium",
  },
  {
    id: 3,
    title: "Cash Flow Analysis",
    description: "Positive cash flow trend detected. 23% improvement compared to last quarter.",
    confidence: 88,
    type: "analysis",
    impact: "high",
  }
];

const getInsightIcon = (type: string) => {
  switch (type) {
    case "prediction":
      return TrendingUp;
    case "alert":
      return AlertTriangle;
    case "analysis":
      return Brain;
    default:
      return Sparkles;
  }
};

const getImpactColor = (impact: string) => {
  switch (impact) {
    case "high":
      return "bg-blue-600";
    case "medium":
      return "bg-yellow-500";
    case "low":
      return "bg-gray-400";
    default:
      return "bg-blue-600";
  }
};

export function AiInsights() {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="w-5 h-5 text-blue-600" />
        <h2 className="text-lg font-semibold text-gray-900">AI Insights</h2>
      </div>
      <div className="space-y-4">
        {insights.map((insight) => {
          const Icon = getInsightIcon(insight.type);
          return (
            <div 
              key={insight.id} 
              className={cn(
                "p-4 rounded-lg transition-all",
                insight.type === "alert" ? "bg-red-50" : "bg-blue-50"
              )}
            >
              <div className="flex items-start gap-3">
                <Icon className={cn(
                  "w-5 h-5 mt-1",
                  insight.type === "alert" ? "text-red-600" : "text-blue-600"
                )} />
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900 mb-1">
                    {insight.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">{insight.description}</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full">
                      <div
                        className={cn("h-2 rounded-full", getImpactColor(insight.impact))}
                        style={{ width: `${insight.confidence}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500">
                      {insight.confidence}% confidence
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}