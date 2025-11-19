import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import type { ChartProps } from './type'

export function DashboardBarChart({ data }: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="periodLabel" />
        <YAxis />
        <Tooltip
          contentStyle={{
            backgroundColor: '#fff',
            border: '1px solid #ddd',
          }}
        />
        <Legend />
        <Bar dataKey="totalStudents" fill="#167f5a" name="Etudiants" />
        <Bar dataKey="totalTeachers" fill="#1e40af" name="Enseignants" />
        <Bar dataKey="totalCourses" fill="#facc15" name="Cours" />
      </BarChart>
    </ResponsiveContainer>
  )
}
