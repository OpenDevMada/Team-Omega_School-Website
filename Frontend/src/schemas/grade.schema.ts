import * as z from "zod";

export const gradeSchema = z.object({
  studentRegistration: z.string().min(1, "Inscription requise"),
  courseTitle: z.string().min(1, "Titre du cours requis"),
  value: z
    .number({ error: "Valeur invalide" })
    .min(0, "Doit être >= 0")
    .max(20, "Doit être <= 20"),
  comment: z.string().optional().nullable(),
});
