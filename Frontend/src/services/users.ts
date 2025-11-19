import { api } from "@/lib/api";
import type { Student, StudentPostData } from "@/types/student";
import type { Teacher } from "@/types/teacher";

export const getUsers = async (choosen: "teachers" | "students") => {
  try {
    const endpoint = choosen === "teachers" ? "/teachers" : "/students";
    const response = await api.get(endpoint, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error(`Error on fetching users: ${error}`);
    throw error;
  }
};

export const createUser = async (
  user: "teacher" | "student",
  info: StudentPostData
) => {
  try {
    const endpoint = user === "student" ? "/student" : "/teacher";
    const successMessage = `${
      user === "teacher" ? "Un enseignant" : "Un eleve"
    } a été crée avec succees.`;
    const response = await api.post(endpoint, info, { withCredentials: true });
    if (response.status === 200) {
      return {
        message: response.data?.message || successMessage,
      };
    }
  } catch (error) {
    console.error(`Error on creating user: ${error}`);
    throw error;
  }
};

export const deleteUser = async (id: string, isTeacher = false) => {
  try {
    const endpoint = isTeacher ? `/teacher/${id}` : `/student/${id}`;
    const successMessage = `${
      isTeacher ? "Un enseignant" : "Un éleve"
    } a été supprimé avec succee.`;
    const response = await api.delete(endpoint, { withCredentials: true });
    if (response.status === 200)
      return {
        message: response.data?.message || successMessage,
      };
  } catch (error) {
    console.error(`Error on deleting user: ${error}`);
    throw error;
  }
};
