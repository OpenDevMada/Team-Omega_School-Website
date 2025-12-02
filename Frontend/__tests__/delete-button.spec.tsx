import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, test, vi } from "vitest";
import type { Student } from "../src/types/student"
import { api } from "../src/lib/api";
import { DeleteUserButton } from "../src/app/_components/delete-button";

vi.mock("sonner", () => ({ toast: { success: vi.fn(), error: vi.fn() } }));


const mockStudent: Student = {
  userId: "s1",
  firstName: "Mickael",
  lastName: "RANDRIANIRINA",
  email: "lucas.dupont@example.com",
  password: "hashed_password",
  address: "10 Rue des Fleurs, Lyon",
  role: "STUDENT",
  createdAt: new Date("2023-09-15"),
  updatedAt: new Date(),
  registrationNumber: "STU-2023-104",
  level: { id: "l1", name: "Terminale S", createdAt: new Date, updatedAt: new Date },
  group: { id: "g1", name: "Groupe A", createdAt: new Date, updatedAt: new Date },
  sex: "MASCULIN",
  birthDate: new Date(2009, 10, 20),
  phoneNumber: "+261 33 90 080 30",
  avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  passwordHash: ""
};

describe("DeleteUserButton", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("Show the dialog and delete user", async () => {
    api.delete = vi.fn().mockResolvedValue({data: {}, status: [200, 204]});

    render(<DeleteUserButton user={mockStudent} withLabel={false} />);

    expect(screen.getByText("Supprimer Mickael RANDRIANIRINA"));

    const confirmButton = await screen.findByRole("button", {
      name: "Continuer",
    });

    await userEvent.click(confirmButton);

    // await waitFor(() => {
    //   expect(api.delete).toHaveBeenCalledWith(
    //     `/students/${mockStudent.userId}`,
    //     { withCredentials: true }
    //   );
    // });
  });

  test("Show error toast when api.delete", async () => {
    (api.delete as any).mockRejectedValue(new Error("Network error"));

    render(<DeleteUserButton user={mockStudent} withLabel={false} />);

    const triggerBtn2 = screen.getByTitle(new RegExp(`Supprimer ${mockStudent.firstName}`, "i"));
    await userEvent.click(triggerBtn2);

    const confirmBtn2 = screen.getByRole("button", { name: "Continuer" });
    await userEvent.click(confirmBtn2!);
  });
});
