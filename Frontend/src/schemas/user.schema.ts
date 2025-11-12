import * as z from "zod";

export const userSchema = z.object({
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
  role: z.enum(["ADMIN", "TEACHER", "STUDENT"]),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const userCredentialsSchema = userSchema.pick({
  email: true,
  password: true,
});
