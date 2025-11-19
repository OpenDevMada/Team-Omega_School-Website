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
import {
  Users,
  SlidersHorizontal,
  ChevronDown,
  Search,
  Check,
  ArrowDownAZ,
  ArrowUpZA,
} from "lucide-react";
import type { UserSearchType } from "./user-search.type";

export function FilterBar({
  search,
  setSearch,
  genderFilter,
  setGenderFilter,
  sort,
  setSort,
}: UserSearchType) {
  return (
    <div className="flex flex-wrap items-center gap-4 justify-between mt-4">
      <div className="relative w-full md:w-1/2">
        <Search className="absolute left-2 top-2.5 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Recherche par nom ou prénom"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-8"
        />
      </div>

      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Users className="w-4 h-4" /> {genderFilter}{" "}
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Filtrer par genre</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {["Tous", "Masculin", "Féminin"].map((option) => (
              <DropdownMenuItem
                key={option}
                onClick={() => setGenderFilter(option as "MASCULIN" | "FEMININ" | "Tous")}
                className="flex items-center justify-between"
              >
                <span>{option}</span>
                {genderFilter === option && <Check className="w-4 h-4 text-blue-600" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4" /> {sort}
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Trier par nom</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {["A-Z", "Z-A"].map((order) => (
              <DropdownMenuItem
                key={order}
                onClick={() => setSort(order as "A-Z" | "Z-A")}
                className="flex items-center justify-between"
              >
                <span className="flex items-center gap-2">{order === "A-Z" ? <>
                  <ArrowDownAZ /> A → Z
                </> : <>
                  <ArrowUpZA /> Z → A
                </>}</span>
                {sort === order && <Check className="w-4 h-4 text-blue-600" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
