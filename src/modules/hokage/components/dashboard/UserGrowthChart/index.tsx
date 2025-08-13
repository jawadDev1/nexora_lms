'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface UserGrowthChartProps {
  data: Array<{ month: string; users: number }>
}

export function UserGrowthChart({ data }: UserGrowthChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis 
          dataKey="month" 
          stroke="#9CA3AF" 
          fontSize={12}
        />
        <YAxis 
          stroke="#9CA3AF" 
          fontSize={12}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: '#1F2937', 
            border: '1px solid #374151',
            borderRadius: '8px',
            color: '#F9FAFB'
          }}
        />
        <Line 
          type="monotone" 
          dataKey="users" 
          stroke="#FFDE00" 
          strokeWidth={3}
          dot={{ fill: '#FFDE00', strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, fill: '#FFDE00' }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
