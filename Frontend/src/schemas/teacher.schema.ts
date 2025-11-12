import { z } from "zod";
import { userSchema } from "./user.schema";
import { courseSchema } from "./course.schema";

export const teacherSchema = userSchema.extend({
  matriculeNumber: z.string(),
  bio: z.string().optional(),
  courses: courseSchema.pick({ title: true }),
});
