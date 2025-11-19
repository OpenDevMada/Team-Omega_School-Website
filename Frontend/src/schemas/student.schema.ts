import z from "zod";
import { userSchema } from "./user.schema";

export const studentSchema = userSchema.extend({
  registrationNumber: z.string().optional(),
  group: z.object({
    name: z
      .string()
      .min(1, "Le nom du groupe est requis")
      .max(50, "Nom du groupe trop long"),
  }),
  level: z
    .object({
      name: z.string().optional(),
    })
    .optional(),
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
