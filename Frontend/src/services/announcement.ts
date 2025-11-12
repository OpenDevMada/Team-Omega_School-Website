import { api } from "@/lib/api";
import type { announcementPostDataSchema } from "@/schemas/announcement.schema";
import type { Announcement } from "@/types/announcement";
import type z from "zod";

export const createAnnouncement = async (
  values: z.infer<typeof announcementPostDataSchema>
) => {
  try {
    const response = await api.post(
      "/announcement",
      { ...values },
      { withCredentials: true }
    );
    if (response.status === 201) {
      return {
        message: "Votre annonce a bien été créée",
        status: response.data,
      };
    }
  } catch (error) {
    console.error(`Error on creating announcement: ${error}`);
    return {
      error: "Une erreur est survenue. Veuillez réessayer.",
      status: 500,
    };
  }
};

export const getAnnouncements = async (): Promise<{
  announcement: Announcement[];
}> => {
  try {
    const response = await api.get("/announcement", { withCredentials: true });
    if (response.status === 200) {
      return { announcement: response.data?.announcement as Announcement[] };
    }
    return { announcement: [] };
  } catch (error) {
    console.error(`Error on fetching announcement: ${error}`);
    throw error;
  }
};

export const deleteAnnouncement = async (id: string) => {
  try {
    const response = await api.delete(`/announcement/${id}`, {
      withCredentials: true,
    });
    if (response.status === 200) {
      return { message: "Annonce supprimée avec succès !" };
    }
  } catch (error) {
    console.error(`Error on deleting announcement: ${error}`);
    throw error;
  }
};

export const updateAnnouncement = async (
  id: string,
  updatedAnnouncement: z.infer<typeof announcementPostDataSchema>
) => {
  try {
    const response = await api.put(
      `/announcement/${id}`,
      { ...updatedAnnouncement },
      { withCredentials: true }
    );
    if (response.status === 200) {
      return { message: "Annonce mise à jour avec succès !" };
    }
  } catch (error) {
    console.error(`Error on updating announcement: ${error}`);
    return {
      error:
        "Une erreur inattendue est survenue. Veuillez réessayer plus tard.",
    };
  }
};
