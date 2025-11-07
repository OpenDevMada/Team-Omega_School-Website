import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";

export function TeachersHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold text-(--blue) dark:text-(--dark-blue)">
          Professeurs
        </h1>
        <p className="text-muted-foreground text-sm">
          Gérez et explorez la liste des enseignants de <strong>Omega School</strong>.
        </p>
      </div>
      <Button className="bg-yellow-400 hover:bg-yellow-500 cursor-pointer shadow-sm">
        <UserPlus className="w-4 h-4 mr-2" /> Ajouter un nouveau
      </Button>
    </div>
  )
}