import { z } from "zod";
import { levelSchema } from "@/schemas/level.schema";
import { groupSchema } from "@/schemas/group.schema";
import { userSchema } from "./user.schema";

export const studentSchema = userSchema.extend({
  registrationNumber: z.string(),
  level: levelSchema,
  group: groupSchema,
});

export const studentPostDataSchema = studentSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  avatar: true,
  level: true,
  registrationNumber: true
});
