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
import { Users, SlidersHorizontal, ChevronDown, Search } from "lucide-react";

interface TeachersFilterBarProps {
  search: string;
  setSearch: (value: string) => void;
  filter: string;
  setFilter: (value: string) => void;
  sort: string;
  setSort: (value: string) => void;
}

export function TeachersFilterBar({
  search,
  setSearch,
  filter,
  setFilter,
  setSort,
}: TeachersFilterBarProps) {
  return (
    <div className="flex flex-col md:flex-row items-center gap-4 justify-between mt-4">
      <div className="relative w-full md:w-1/2">
        <Search className="absolute left-2 top-2.5 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Recherche par nom ou prenom"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-8"
        />
      </div>

      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Users className="w-4 h-4" /> {filter} <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Filtrer par genre</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setFilter("Tous")}>Tous</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilter("Masculin")}>Masculin</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilter("Féminin")}>Féminin</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4" /> Trier <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Trier par nom</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setSort("A-Z")}>A → Z</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSort("Z-A")}>Z → A</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}