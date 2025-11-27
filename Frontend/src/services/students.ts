import { type Group, type Level, type Student } from "@/types/student";
import { BaseService } from "./base";
import type { StudentPayload } from "@/validation/user";
import { api } from "@/lib/api";

class StudentService extends BaseService<
  Student,
  StudentPayload,
  StudentPayload
> {
  constructor() {
    super("/students");
  }

  async getByLevel(level: string) {
    return api
      .get<Student[]>(`/students/level/${level}`, { withCredentials: true })
      .then((res) => res.data);
  }

  async getByGroup(group: string)  {
    return api
      .get<Student[]>(`/students/group/${group}`, { withCredentials: true })
      .then((res) => res.data);
  }

  async getByRegistration(number: string)  {
    return api
      .get<Student[]>(`/students/registration/${number}`, { withCredentials: true })
      .then((res) => res.data);
  }
}

export const studentService = new StudentService();
export const groupService = new BaseService<Group, any, any>("/groups");
export const levelService = new BaseService<Level, any, any>("/level");
