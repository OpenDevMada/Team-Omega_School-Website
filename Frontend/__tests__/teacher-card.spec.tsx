import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { Teacher } from "../src/types/teacher"
import { describe, test, expect } from "vitest";
import { TeacherCard } from "../src/components/teacher-card"

const teacherMock: Teacher = {
  userId: "t-1",
  firstName: "David",
  lastName: "Rakotobe",
  email: "david@gmail.com",
  birthDate: new Date("1988-02-15"),
  sex: "MASCULIN",
  address: "Antananarivo",
  phoneNumber: "+261341234570",
  role: "TEACHER",
  createdAt: new Date(),
  updatedAt: new Date(),
  matriculeNumber: "T-2025-002",
  bio: "Expert en physique",
  avatar: null,
  courses: [
    {
      id: "c1",
      title: "Physique",
      description: "No description XD",
      teacherName: "David",
      teacherMatricule: "T-2025-002",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  passwordHash: "",
  password: ""
};

describe("TeacherCard", () => {
  test("Show name and email", () => {
    render(<TeacherCard teacher={teacherMock} />);

    const emails = screen.getAllByText("david@gmail.com");

    expect(screen.getByText("Mr David")).toBeInTheDocument();
    expect(emails.length).toBeGreaterThan(1);
  });

  test("Open the dialog when user click in the button with Eye icon", async () => {
    render(<TeacherCard teacher={teacherMock} />);

    const buttons = screen.getAllByRole("button");

    await userEvent.click(buttons[0]);

    expect(await screen.findByText("T-2025-002")).toBeInTheDocument();
  });
});
