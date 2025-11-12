import { z } from "zod";

export const courseSchema = z.object({
  title: z
    .string()
    .max(50, "Titre de cours trop longue.")
    .min(3, "Titre trop courte."),
  description: z.string().optional(),
  teacherMatricule: z.string(),
});
