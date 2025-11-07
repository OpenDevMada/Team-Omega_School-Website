import { z } from "zod";

export const levelSchema = z.object({
  id: z.string(),
  levelName: z.string(),
});
