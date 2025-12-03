import * as z from "zod";

export const userSchema = z.object({
  firstName: z.string().min(1, "Le prénom est requis"),
  lastName: z.string().min(1, "Le nom est requis"),
  email: z.email("Email invalide"),
  birthDate: z.date({ error: () => ({ message: "La date de naissance est requise" }) }),
  phoneNumber: z.string().min(10, { message: "Numéro de téléphone invalide" }),
  address: z.string().min(5, { message: "Adresse trop courte" }),
  sex: z
    .enum(["MASCULIN", "FEMININ", "PAS_SPECIFIE"])
    .refine((value) => value !== undefined && value !== null, {
      message: "Sélectionner un genre",
    }),
  role: z.enum(["ADMIN", "TEACHER", "STUDENT"]),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Mot de passe actuel requis"),
    newPassword: z
      .string()
      .min(8, "Le mot de passe doit faire au moins 8 caractères")
      .regex(/[A-Z]/, "Doit contenir une majuscule")
      .regex(/\d/, "Doit contenir un chiffre")
      .regex(/[^a-zA-Z0-9]/, "Doit contenir un caractère spécial"),
    confirmPassword: z.string().min(1, "Confirmation obligatoire"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Les deux mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

