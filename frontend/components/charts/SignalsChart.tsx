'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface SignalsChartProps {
  data: Array<{
    date: string;
    buy: number;
    sell: number;
  }>;
}

export function SignalsChart({ data }: SignalsChartProps) {
  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="date" stroke="var(--muted-foreground)" />
          <YAxis stroke="var(--muted-foreground)" />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'var(--card)',
              border: '1px solid var(--border)',
              color: 'var(--card-foreground)'
            }}
          />
          <Legend />
          <Bar dataKey="buy" fill="var(--success)" name="Buy Signals" />
          <Bar dataKey="sell" fill="var(--error)" name="Sell Signals" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
