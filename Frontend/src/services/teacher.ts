import type { Teacher, TeacherUpdateDto } from "@/types/teacher";
import { BaseService } from "./base";
import { api } from "@/lib/api";

class TeacherService extends BaseService<Teacher, any, TeacherUpdateDto> {
  constructor() {
    super("/teachers");
  }

  async getByStudentRegistration(number: string) {
    return api.get(`/students/teachers/${number}`).then((res) => res.data);
  }
}

export const teacherService = new TeacherService();
