import type { Dispatch, SetStateAction } from "react";

export type UserSearchType = {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  genderFilter: "Tous" | "MASCULIN" | "FEMININ";
  setGenderFilter: (value: "Tous" | "MASCULIN" | "FEMININ") => void;
  sort: "A-Z" | "Z-A";
  setSort: (value: "A-Z" | "Z-A") => void;
};
