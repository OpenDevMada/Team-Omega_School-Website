import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Search, Sliders, Users, Layers, List } from "lucide-react";

export type StudentsFilterBarProps = {
  search: string;
  setSearch: (v: string) => void;
}

export function StudentsFilterBar({ search, setSearch }: StudentsFilterBarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="relative w-80">
        <Search className="absolute left-2 top-2.5 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Recherche par nom ou prénom"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-8"
        />
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <Sliders className="w-4 h-4 mr-2" /> Filtrer par
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>
            Option de filtre
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex items-center gap-2">
            <Users className="w-4 h-4" /> Classe
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2">
            <Layers className="w-4 h-4" /> Niveau
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2">
            <List className="w-4 h-4" /> Tous
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}