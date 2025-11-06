import type { Group } from "./group";
import type { Level } from "./level";
import type { User } from "./user";

export interface Student extends User {
  registrationNumber: string;
  level: Level;
  group: Group;
}
