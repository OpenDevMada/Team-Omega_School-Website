import type { Stat } from "@/types/statistic";

export interface ChartProps {
  data: Omit<Stat, "periodLabel" | "periodEnd">[]
}

export interface PieChartProps {
  data: Pick<Stat, "totalCourses" | "totalStudents" | "totalTeachers">
}
