import type { Dispatch, SetStateAction } from "react";

export type UserSearchType = {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  genderFilter: "Tous" | "Masculin" | "Féminin";
  setGenderFilter: (value: "Tous" | "Masculin" | "Féminin") => void;
  sort: "A-Z" | "Z-A";
  setSort: (value: "A-Z" | "Z-A") => void;
};
