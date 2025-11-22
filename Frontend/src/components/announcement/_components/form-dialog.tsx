import { useTransition, type Dispatch, type SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import * as z from "zod";

import { announcementPostDataSchema } from "@/schemas/announcement.schema";
import {
  createAnnouncement,
  updateAnnouncement,
} from "@/services/announcement";
import { useAnnouncements } from "@/hooks/use-announcement";
import type { Announcement } from "@/types/announcement";
import { useForm } from "react-hook-form";

interface Props {
  editing: Announcement | null;
  setOpen: Dispatch<SetStateAction<boolean>>
}

export function AnnouncementDialogForm({ editing, setOpen }: Props) {
  const [pending, startTransition] = useTransition();
  const { refetch } = useAnnouncements();

  const form = useForm<z.infer<typeof announcementPostDataSchema>>({
    resolver: zodResolver(announcementPostDataSchema),
    defaultValues: {
      title: editing?.title || "",
      description: editing?.description || "",
    },
  });

  const handleSubmit = form.handleSubmit((values) => {
    startTransition(async () => {
      try {
        const response = editing
          ? await updateAnnouncement(editing.id, values)
          : await createAnnouncement(values);

        if (response?.message) {
          toast.success(
            editing
              ? "Annonce mise à jour avec succès"
              : "Annonce créée avec succès"
          );
          form.reset();
          refetch();
          setOpen(false);
        } else {
          toast.error(response?.error || "Erreur inattendue");
        }
      } catch (err: any) {
        toast.error(err?.message || "Erreur lors de l'envoi");
      }
    });
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titre</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Examens blancs BEPC 2026" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Préparez-vous pour la classe de 3ème..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={pending}
          className="bg-yellow-500 hover:bg-yellow-600 text-white flex items-center justify-center gap-2"
        >
          {pending ? (
            <>
              <Spinner className="w-4 h-4" />
              {editing ? "Mise à jour..." : "Soumission..."}
            </>
          ) : editing ? (
            "Mettre à jour"
          ) : (
            "Soumettre"
          )}
        </Button>
      </form>
    </Form>
  );
}
