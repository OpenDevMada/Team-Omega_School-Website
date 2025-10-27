import z from "zod";

export const StudentSchema = z.object({
  firstName: z.string().min(3, "Le prenom doit avoir au moins 3 caracteres."),
  lastName: z.string().min(3, "Un nom doit avoir au moins 3 caracteres"),
  email: z.email(),
  birthDate: z.date({ error: "La date de naissance est requise." }),
  grade: z.string().nonempty("La classe est requise"),
  phoneNumber: z
    .string()
    .regex(/^(\+?\d{9,15})$/, "Numero de telephone invalide"),
  address: z.string().min(5, "Adresse trop courte."),
});
