import { z } from "zod";
import { userSchema } from "./user.schema";

export const teacherSchema = userSchema.extend({
  matriculeNumber: z.string().nonempty("Matricule requis"),
  bio: z.string().optional(),
  role: z.literal("TEACHER"),
});

export const teacherSchemaDto = teacherSchema.pick({
  firstName: true,
  lastName: true,
  email: true,
  birthDate: true,
  sex: true,
  address: true,
  phoneNumber: true,
  bio: true,
  matriculeNumber: true,
});
