import z from "zod";

export const roleSchema = z.union([
  z.literal("ADMIN"),
  z.literal("TEACHER"),
  z.literal("STUDENT"),
]);

export const userSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  gender: z.union([z.literal("Masculin"), z.literal("F\u00E9minin"), z.literal("Pas specifie")]),
  birthDate: z.date(),
  email: z.string(),
  phone: z.string(),
  password: z.string(),
  address: z.string(),
  phoneNumber: z.string(),
  avatar: z.string().nullable(),
  role: roleSchema,
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const userCredentialsSchema = userSchema.pick({
  email: true,
  password: true,
});
