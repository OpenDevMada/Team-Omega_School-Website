import z from "zod";
import { userSchema } from "./user.schema";

export const studentSchema = userSchema.extend({
  registrationNumber: z.string().optional(),
  group: z.object({
    groupName: z
      .string()
      .min(1, "Le nom du groupe est requis")
      .max(50, "Nom du groupe trop long"),
  }),
  level: z
    .object({
      levelName: z.string().optional(),
    })
    .optional(),
});

export const studentPostDataSchema = studentSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  avatar: true,
  registrationNumber: true,
  level: true,
});
