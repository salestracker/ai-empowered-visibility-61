import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { AlertTriangle } from "lucide-react";

const anomalyData = [
  { timestamp: "00:00", value: 100, isAnomaly: false },
  { timestamp: "01:00", value: 120, isAnomaly: false },
  { timestamp: "02:00", value: 95, isAnomaly: false },
  { timestamp: "03:00", value: 250, isAnomaly: true },
  { timestamp: "04:00", value: 110, isAnomaly: false },
  { timestamp: "05:00", value: 105, isAnomaly: false },
  { timestamp: "06:00", value: 40, isAnomaly: true },
];

const anomalyAlerts = [
  {
    id: 1,
    type: "Spike",
    metric: "Order Volume",
    timestamp: "03:00",
    value: 250,
    threshold: 150,
    status: "Active",
  },
  {
    id: 2,
    type: "Drop",
    metric: "Order Volume",
    timestamp: "06:00",
    value: 40,
    threshold: 80,
    status: "Active",
  },
];

export function AnomalyDetection() {
  const [selectedTimeframe] = useState("last_24h");

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Anomaly Detection</h3>
          <Button variant="outline">Configure Alerts</Button>
        </div>

        <div className="h-[300px] mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={anomalyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={(props) => {
                  const isAnomaly = anomalyData[props.index]?.isAnomaly;
                  if (isAnomaly) {
                    return (
                      <circle
                        cx={props.cx}
                        cy={props.cy}
                        r={6}
                        fill="#ef4444"
                        stroke="none"
                      />
                    );
                  }
                  return null;
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Active Anomaly Alerts</h4>
          {anomalyAlerts.map((alert) => (
            <div
              key={alert.id}
              className="p-4 bg-red-50 border border-red-200 rounded-lg"
            >
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-600 mt-1" />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="font-medium text-gray-900">
                        {alert.type} Detected in {alert.metric}
                      </h5>
                      <p className="text-sm text-gray-600">
                        Value: {alert.value} (Threshold: {alert.threshold})
                      </p>
                    </div>
                    <span className="text-sm text-red-600 font-medium">
                      {alert.timestamp}
                    </span>
                  </div>
                  <div className="mt-2 flex gap-2">
                    <Button variant="outline" size="sm">
                      Investigate
                    </Button>
                    <Button variant="outline" size="sm">
                      Dismiss
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}