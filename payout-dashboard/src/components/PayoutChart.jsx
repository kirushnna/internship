import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const chartData = [
  { day: "Aug 1", payout: 6200 },
  { day: "Aug 2", payout: 8400 },
  { day: "Aug 3", payout: 7100 },
  { day: "Aug 4", payout: 9800 },
  { day: "Aug 5", payout: 8600 },
  { day: "Aug 6", payout: 11200 },
  { day: "Aug 7", payout: 9200 },
  { day: "Aug 8", payout: 12700 },
  { day: "Aug 9", payout: 23900 },
];

function PayoutChart() {
  return (
    <div className="chart-card">
      <div className="card-heading">
        <div>
          <h3>Payout Overview</h3>
          <p>Regular payout volume over the last 9 days</p>
        </div>

        <select className="chart-select">
          <option>Last 9 days</option>
          <option>Last 30 days</option>
          <option>This year</option>
        </select>
      </div>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) =>
                `₹${value / 1000}k`
              }
            />

            <Tooltip
              formatter={(value) => [
                `₹${value.toLocaleString()}`,
                "Payout",
              ]}
            />

            <Line
              type="monotone"
              dataKey="payout"
              stroke="#6366f1"
              strokeWidth={3}
              dot={{
                r: 4,
              }}
              activeDot={{
                r: 7,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default PayoutChart;