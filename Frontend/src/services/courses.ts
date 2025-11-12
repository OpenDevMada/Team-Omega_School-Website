import { api } from "@/lib/api";
import type { courseSchema } from "@/schemas/course.schema";
import type { Course } from "@/types/course";
import { useState } from "react";
import * as z from "zod";

export const createCourse = async (course: z.infer<typeof courseSchema>) => {
  try {
    const response = await api.post(
      "/course",
      { course },
      { withCredentials: true }
    );
    if (response.status === 201) {
      return {
        message: "Cours cree avec succes",
        status: 200,
      };
    }
  } catch (error) {
    console.error(`Error on creating course: ${error}`);
    throw error;
  }
};

export const getCourses = async () => {
  const [courses, setCourses] = useState<Course[]>([]);
  try {
    const response = await api.get("/courses", { withCredentials: true });
    if (response.status === 200) {
      setCourses(response.data?.courses as Course[]);
      return { courses };
    }
  } catch (error) {
    console.error(`Error on fetching course: ${error}`);
    throw error;
  }
};

export const updateCourse = async (
  id: string,
  updatedCourse: z.infer<typeof courseSchema>
) => {
  try {
    const response = await api.put(
      `/courses/${id}`,
      { updatedCourse },
      { withCredentials: true }
    );
    if (response.status === 200) {
      return {
        message: "Le cours a bien ete mis a jour.",
      };
    }
  } catch (error) {
    console.error(`Error on updating course: ${error}`);
    throw error;
  }
};

export const deleteCourse = async (id: string) => {
  try {
    const response = await api.delete(`/courses/${id}`, {
      withCredentials: true,
    });
    if (response.status === 200) {
      return {
        message: "Le cours a bien ete supprime",
      };
    }
  } catch (error) {
    console.error(`Error on deleting course: ${error}`);
    throw error;
  }
};
