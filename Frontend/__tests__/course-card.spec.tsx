import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import type {Course} from "../src/types/course";
import {CourseCard} from "../src/components/courses/app-course-card"

const mockCourse: Course = {
  id: "1",
  title: "Math",
  description: "Basic math",
  teacherName: "Rakoto",
  createdAt: new Date(2025, 10, 2),
  updatedAt: new Date(2025, 10, 1),
  teacherMatricule: "TCH-2025-10",
};

describe("CourseCard", () => {
  it("renders course info", () => {
    render(<CourseCard {...mockCourse} role="STUDENT" withLabel={false} />);
    expect(screen.getByText("Math")).toBeInTheDocument();
    expect(screen.getByText("Basic math")).toBeInTheDocument();
  });

  // add more here
});
