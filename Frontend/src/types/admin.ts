import type { BaseUser } from "./user";

export interface Admin extends BaseUser {
  permission: string;
}

export interface PaginatedResponse<T> {
  totalElements: number;
  totalPages: number;
  numberOfElements: number;
  size: number;
  content: T[];
  number: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}