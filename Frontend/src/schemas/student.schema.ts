import z from "zod";
import { userSchema } from "./user.schema";

export const studentSchema = userSchema.extend({
  registrationNumber: z.string().min(1, "Le numéro d'inscription est requis").optional(),
  level: z.string().min(1, "Le niveau est requis"),
  group: z.string().min(1, "La classe est requise"),
  emergencyContact: z.string().optional(),
});

export const studentPostDataSchema = studentSchema.pick({
  firstName: true,
  lastName: true,
  email: true,
  birthDate: true,
  sex: true,
  address: true,
  phoneNumber: true,
  level: true,
  group: true
});
