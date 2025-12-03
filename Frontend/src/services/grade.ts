import type { Grade, GradeRequestDto } from "@/types/grade";
import { BaseService } from "./base";
import { api } from "@/lib/api";

class GradeService extends BaseService<Grade, GradeRequestDto, GradeRequestDto> {
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
