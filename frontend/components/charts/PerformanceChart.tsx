'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '@/lib/utils';

interface PerformanceChartProps {
  data: Array<{
    timestamp: number;
    value: number;
  }>;
}

export function PerformanceChart({ data }: PerformanceChartProps) {
  const formattedData = data.map((item) => ({
    time: new Date(item.timestamp).toLocaleDateString(),
    value: item.value,
  }));

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="time" stroke="var(--muted-foreground)" />
          <YAxis 
            tickFormatter={(value) => formatCurrency(value, 0)} 
            stroke="var(--muted-foreground)"
          />
          <Tooltip
            formatter={(value: number) => formatCurrency(value)}
            contentStyle={{
              backgroundColor: 'var(--card)',
              border: '1px solid var(--border)',
              color: 'var(--card-foreground)'
            }}
            labelStyle={{ color: 'var(--card-foreground)' }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            stroke="var(--primary)"
            strokeWidth={2}
            dot={false}
            name="Portfolio Value"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
