import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  {
    name: "Service Charge",
    value: 717,
  },
  {
    name: "TDS",
    value: 478,
  },
  {
    name: "Re-Purchase",
    value: 2390,
  },
];

const colors = [
  "#6366f1",
  "#14b8a6",
  "#f59e0b",
];

function FeeBreakdown() {
  return (
    <div className="chart-card fee-card">
      <div className="card-heading">
        <div>
          <h3>Fee Breakdown</h3>
          <p>Current payout deductions</p>
        </div>
      </div>

      <div className="pie-container">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={4}
            >
              {data.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={colors[index]}
                />
              ))}
            </Pie>

            <Tooltip
              formatter={(value) =>
                `₹${value.toLocaleString()}`
              }
            />

            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default FeeBreakdown;