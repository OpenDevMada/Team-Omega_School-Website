import { z } from "zod";

export const groupSchema = z.object({
  id: z.string(),
  groupName: z.string(),
});
