import type { Grade, GradeRequestDto } from "@/types/grade";
import { BaseService } from "./base";
import { api } from "@/lib/api";

class GradeService extends BaseService<Grade, GradeRequestDto, GradeRequestDto> {
  constructor() {
    super("/grades");
  }

  async getByStudent(number: string) {
    return api
      .get(`/grades/student/${number}`, { withCredentials: true })
      .then((res) => res.data.content as Grade[]);
  }

  async getByCourse(title: string) {
    return api
      .get(`/grades/course/${title}`, { withCredentials: true })
      .then((res) => res.data.content as Grade[]);
  }
  
  // @ts-expect-error
  delete(studentRegistration: string, courseTitle: string) {
  return api.delete("/grades", {
    params: { studentRegistration, courseTitle },
  });
}
}

export const gradeService = new GradeService();
