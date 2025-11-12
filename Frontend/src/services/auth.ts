import { api } from "@/lib/api";
import type { UserCredentials } from "@/types/user";

export const login = async (credentials: UserCredentials) => {
  try {
    const response = await api.post("/auth/login", credentials, {withCredentials: true});
    return response.data;
  } catch (error) {
    console.error(`Authentication error: ${error}`);
    throw error;
  }
}

export const logout = async () => {
  // To implement later...
}
