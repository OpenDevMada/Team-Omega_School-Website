import type { Grade } from "@/types/grade";
import { BaseService } from "./base";
import { api } from "@/lib/api";

class GradeService extends BaseService<Grade, any, any> {
  constructor() {
    super("/grades");
  }

  async getByStudent(number: string) {
    return api
      .get<Grade[]>(`/grades/student/${number}`, { withCredentials: true })
      .then((res) => res.data);
  }

  async getByCourse(title: string) {
    return api
      .get<Grade[]>(`/grades/course/${title}`, { withCredentials: true })
      .then((res) => res.data);
  }
}

export const gradeService = new GradeService();
