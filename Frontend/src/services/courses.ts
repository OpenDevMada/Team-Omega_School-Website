import type { Course } from "@/types/course";
import { BaseService } from "./base";
import { api } from "@/lib/api";

type CourseRequestDto = Pick<
  Course,
  "title" | "description" | "teacherMatricule"
>;

class CourseService extends BaseService<
  Course,
  CourseRequestDto,
  CourseRequestDto
> {
  constructor() {
    super("/courses");
  }

  async getTeacher(matricule: string) {
    return api
      .get<Course[]>(`/courses/teacher/${matricule}`, { withCredentials: true })
      .then((res) => res.data);
  }
}

export const courseService = new CourseService();
