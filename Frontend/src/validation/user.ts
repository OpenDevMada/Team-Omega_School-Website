import { z } from "zod";

const baseUserSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "Le prénom doit contenir au moins 2 caractères" }),
  lastName: z
    .string()
    .min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  email: z.email({ message: "Adresse email invalide" }),
  birthDate: z.date({ message: "Votre date de naissance est requise" }),
  sex: z.enum(["MASCULIN", "FEMININ", "PAS_SPECIFIE"], {
    message: "Veuillez sélectionner un sexe",
  }),
  address: z.string().min(5, { message: "Adresse trop courte" }),
  phoneNumber: z.string().min(10, { message: "Numéro de téléphone invalide" }),
});

export const studentSchema = baseUserSchema.extend({
  role: z.literal("STUDENT"),
  level: z.string().min(1, { message: "Niveau requis" }),
  group: z.string().min(1, { message: "Classe requise" }),
  emergencyContact: z.string().min(10, { message: "Numéro de téléphone invalide" }),
});

export const teacherSchema = baseUserSchema.extend({
  role: z.literal("TEACHER"),
  matriculeNumber: z
    .string()
    .min(1, { message: "Numéro de matricule requis" }),
  bio: z.string().default(""),
});

export const userSchema = z.discriminatedUnion("role", [
  studentSchema,
  teacherSchema,
]);

export type StudentFormType = z.infer<typeof studentSchema>;
export type TeacherFormType = z.infer<typeof teacherSchema>;
export type UserFormType = z.infer<typeof userSchema>;

export interface StudentPayload extends Omit<StudentFormType, "birthDate"> {
  birthDate: Date;
}

export interface TeacherPayload extends Omit<TeacherFormType, "birthDate"> {
  birthDate: string;
}
