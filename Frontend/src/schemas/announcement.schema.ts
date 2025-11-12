import { z } from "zod";

export const announcementSchema = z.object({
  id: z.string().readonly(),
  title: z.string().min(4, "Titre trop court").nonempty("Titre requis"),
  description: z
    .string()
    .min(10, "Description de l'annonce trop courte.")
    .nonempty("Description requise"),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const announcementPostDataSchema = announcementSchema.pick({
  title: true,
  description: true,
});
