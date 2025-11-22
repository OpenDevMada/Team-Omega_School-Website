import z from "zod";
import { userSchema } from "./user.schema";

export const adminSchema = userSchema;

export type AdminForm = z.infer<typeof adminSchema>;
