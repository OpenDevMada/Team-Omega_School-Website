import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts'
import type { PieChartProps } from './type'

export function DashboardPieChart({ data }: PieChartProps) {
  const chartData = [
    { name: 'Etudiants', value: data.totalStudents ?? 0 },
    { name: 'Enseignants', value: data.totalTeachers ?? 0 },
    { name: 'Cours', value: data.totalCourses ?? 0 },
  ];

  const COLORS = [
    '#fe9a00',
    '#104e64',
    '#f54900',
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={(entry) => `${entry.name}: ${entry.value}`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {chartData.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: 'var(--background)',
            border: '1px solid var(--border)',
          }}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}
