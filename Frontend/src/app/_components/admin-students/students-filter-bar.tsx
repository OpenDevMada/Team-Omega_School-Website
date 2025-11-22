import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, Sliders, ArrowDownAZ, ArrowUpZA, Users } from "lucide-react";
import type { UserSearchType } from "../user-search.type";

export function StudentsFilterBar({
  search,
  setSearch,
  setGenderFilter,
  setSort,
}: UserSearchType) {
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
            <Sliders className="w-4 h-4 mr-2" /> Filtres
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Filtrer par genre</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setGenderFilter("Tous")}>
            <Users className="w-4 h-4 mr-2" /> Tous
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setGenderFilter("Masculin")}>
            <Users className="w-4 h-4 mr-2 text-blue-500" /> Masculin
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setGenderFilter("Féminin")}>
            <Users className="w-4 h-4 mr-2 text-pink-500" /> Féminin
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuLabel>Trier par nom</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setSort("A-Z")}>
            <ArrowDownAZ className="w-4 h-4 mr-2" /> A → Z
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setSort("Z-A")}>
            <ArrowUpZA className="w-4 h-4 mr-2" /> Z → A
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
