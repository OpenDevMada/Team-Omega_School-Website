import type { Teacher, TeacherUpdateDto } from "@/types/teacher";
import { BaseService } from "./base";

export const teacherService = new BaseService<Teacher, any, TeacherUpdateDto>(
  "/teachers"
);
