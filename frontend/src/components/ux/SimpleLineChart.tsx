'use client';

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

interface SimpleLineChartProps {
  data: { name: string; value: number }[];
}

export default function SimpleLineChart({ data }: SimpleLineChartProps) {
  return (
    <div className="h-48">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ left: 0, right: 0, top: 4, bottom: 0 }}
        >
          <XAxis dataKey="name" hide axisLine={false} tickLine={false} />
          <YAxis hide />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
