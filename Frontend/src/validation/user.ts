import { z } from "zod";

export const studentSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "Le prénom doit contenir au moins 2 caractères" }),
  lastName: z
    .string()
    .min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  birthDate: z.date({ message: "Votre date de naissance est requise" }),
  email: z.email({ message: "Adresse email invalide" }),
  phoneNumber: z.string().min(10, { message: "Numéro de téléphone invalide" }),
  address: z.string().min(5, { message: "Adresse trop courte" }),
  gender: z.enum(["Masculin", "Féminin", "Pas spécifié"]),
  role: z.literal("STUDENT"),
  group: z.object({ groupName: z.string() }),
  level: z.object({ levelName: z.string() }),
});

export const teacherSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "Le prénom doit contenir au moins 2 caractères" }),
  lastName: z
    .string()
    .min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  birthDate: z.date({ message: "Votre date de naissance est requise" }),
  email: z.email({ message: "Adresse email invalide" }),
  phoneNumber: z.string().min(10, { message: "Numéro de téléphone invalide" }),
  address: z.string().min(5, { message: "Adresse trop courte" }),
  gender: z.enum(["Masculin", "Féminin", "Pas spécifié"]),
  role: z.literal("TEACHER"),
  courses: z.array(z.string()),
  matriculeNumber: z.string(),
});

export const userSchema = z.discriminatedUnion("role", [
  studentSchema,
  teacherSchema,
]);

export type StudentFormType = z.infer<typeof studentSchema>;
export type TeacherFormType = z.infer<typeof teacherSchema>;
export type UserFormType = z.infer<typeof userSchema>;
