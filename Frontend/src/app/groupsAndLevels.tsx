import { useEffect, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Trash2, Edit, Plus, Layers, Users } from "lucide-react";
import {
  groupService,
  levelService,
} from "./_components/admin-students/update-dialog";
import { Spinner } from "@/components/ui/spinner";
import type { Group, Level } from "@/types/student";
import { toast } from "sonner";
import { SwitchTabs, type View } from "./_components/switch-tabs";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Empty, EmptyContent, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";

export default function GroupsAndLevelsPage() {
  const [view, setView] = useState<View>("groups");
  const [groups, setGroups] = useState<Group[]>([]);
  const [levels, setLevels] = useState<Level[]>([]);
  const [loading, setLoading] = useState(true);
  const [pending, startTransition] = useTransition();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Group | Level | null>(null);
  const [inputValue, setInputValue] = useState("");

  const fetchItems = async () => {
    setLoading(true);

    try {
      if (view === "groups") {
        const res = await groupService.getAll();
        setGroups(res);
      } else {
        const res = await levelService.getAll();
        setLevels(res);
      }
    } catch (error: any) {
      toast.error(error?.message || "Erreur lors du chargement");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [view]);

  const handleSave = () => {
    startTransition(async () => {
      await new Promise((res) => setTimeout(res, 1000));
      if (!inputValue.trim()) return;

      try {
        if (view === "groups") {
          if (editingItem)
            await groupService.update(editingItem.id, { name: inputValue });
          else await groupService.create({ groupName: inputValue });
        } else {
          if (editingItem)
            await levelService.update(editingItem.id, { name: inputValue });
          else await levelService.create({ levelName: inputValue });
        }
        setDialogOpen(false);
        setEditingItem(null);
        setInputValue("");
        fetchItems();
      } catch (error) {
        toast.error("Erreur lors de l'enregistrement.");
        console.error(error);
      }
    });
  };

  const handleDelete = (id: string) => {
    startTransition(async () => {
      await new Promise((res) => setTimeout(res, 1000));
      try {
        if (view === "groups") await groupService.delete(id);
        else await levelService.delete(id);
        fetchItems();
      } catch (error: any) {
        toast.error(error?.message);
        console.error(error);
      }
    });
  };

  const items = view === "groups" ? groups : levels;

  return (
    <div className="p-6 flex flex-col gap-4 min-h-screen">
      <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
        <div className="flex flex-col space-y-1.5">
          <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0 text-(--blue)">
            Les groupes et niveaux
          </h1>
          <p className="text-sm text-muted-foreground">Gerez la liste des groupes et niveaux existants</p>
        </div>

        <div className="flex justify-center flex-1">
          <SwitchTabs
            options={[
              { id: "groups", icon: Users, label: "Groups" },
              { id: "levels", icon: Layers, label: "Levels" },
            ]}
            value={view}
            onChange={setView}
          />
        </div>

        <AlertDialog
          open={dialogOpen}
          onOpenChange={(open) => {
            setDialogOpen(open);
            if (!open) {
              setEditingItem(null);
              setInputValue("");
            }
          }}
        >
          <AlertDialogTrigger asChild>
            <Button className="ml-auto text-white bg-(--blue) hover:bg-blue-800">
              <Plus className="w-4 h-4" /> Ajouter
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {editingItem ? "Modifier" : "Créer"} le{" "}
                {view === "groups" ? "groupe" : "niveau"}
              </AlertDialogTitle>
            </AlertDialogHeader>

            <Input
              placeholder="Nom"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />

            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <Button onClick={handleSave} disabled={pending}>
                {pending ? (
                  editingItem ? (
                    <Spinner />
                  ) : (
                    <>
                      <Spinner /> Creation...
                    </>
                  )
                ) : editingItem ? (
                  "Modifier"
                ) : (
                  "Creer"
                )}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      {
        loading ? (
          <div className="flex flex-col items-center justify-center gap-3 mx-auto min-h-[60vh] w-full">
            <Spinner className="size-8" />
            <p className="text-center">
              Chargement des {view === "groups" ? "groupes" : "niveaux"}...
            </p>
          </div>
        ) : (
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5`}>
            {items.length > 0 ? (
              items.map((item) => (
                <Card
                  key={item.id}
                  className="rounded-xl border hover:shadow-lg transition-all duration-75 hover:border-gray-100"
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                      {view === "groups" ? (
                        <Users size={18} />
                      ) : (
                        <Layers size={18} />
                      )}
                      {item.name} {item.id}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="text-sm text-muted-foreground space-y-1">
                    <p>
                      Créé le : {format(item.createdAt, "PPP", { locale: fr })}
                    </p>
                    <p>
                      Mis à jour le :{" "}
                      {format(item.updatedAt, "PPP", { locale: fr })}
                    </p>
                  </CardContent>

                  <CardFooter className="flex gap-2 justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      className="hover:bg-blue-50"
                      onClick={() => {
                        setEditingItem(item);
                        setInputValue(item.name);
                        setDialogOpen(true);
                      }}
                    >
                      <Edit size={16} />
                    </Button>

                    <Button variant="destructive" size="sm">
                      <Trash2 size={16} onClick={() => handleDelete(item.id)} />
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="w-full col-span-full bg-card/80 rounded-xl flex items-center min-h-[60vh]">
                <Empty>
                  <EmptyHeader>
                    <EmptyMedia variant={"icon"}>
                      {view == "groups" ? <Users /> : <Layers />}
                    </EmptyMedia>
                    <EmptyContent>
                      <EmptyTitle>Aucun {view === "groups" ? "groupe" : "niveau"} trouvé</EmptyTitle>
                    </EmptyContent>
                  </EmptyHeader>
                </Empty>
              </div>
            )}
          </div>
        )
      }
    </div >
  );
}
