import type { Enrollment } from "@/types/enrollment";
import { api } from "@/lib/api";

export const enrollmentService = {
  create: async (data: any) => {
    const res = await api.post<Enrollment>(`/enrollments`, data, {withCredentials: true});
    return res.data;
  },

  getByStudent: async (number: string) => {
    const res = await api.get<Enrollment[]>(`/enrollments/student/${number}`, {withCredentials: true});
    return res.data;
  },

  getByCourse: async (title: string) => {
    const res = await api.get<Enrollment[]>(`/enrollments/course/${title}`, {withCredentials: true});
    return res.data;
  },

  delete: async (number: string, title: string) => {
    await api.delete(`/enrollment/${number}/${title}`, {withCredentials: true});
  }
}