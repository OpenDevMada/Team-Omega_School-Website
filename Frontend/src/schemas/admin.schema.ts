import z from "zod";
import { userSchema } from "./user.schema";

export const adminSchema = userSchema.and(z.object({
  password: z.string()
}));

export type AdminForm = z.infer<typeof adminSchema>;
