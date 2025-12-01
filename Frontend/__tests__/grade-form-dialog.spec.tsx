import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { GradeFormDialog } from "../src/components/grades/form-dialog";
import type { Grade } from "../src/types/grade";

const mockSubmit = vi.fn();

describe("GradeFormDialog", () => {
  it("opens the dialog", async () => {
    render(
      <GradeFormDialog
        mode="create"
        onSaved={mockSubmit}
        open={false}
        setOpen={vi.fn()}
      />
    );

    const createGrade = screen.getAllByText("Créer une note");
    await screen.findByTestId("AlertDialogTrigger"); // by clicking on the button trigger

    expect(createGrade.length).toBeGreaterThan(1);
    expect(screen.getByLabelText("Titre du cours")).toBeInTheDocument();
    expect(screen.getByLabelText("Numéro d'inscription")).toBeInTheDocument();
    expect(screen.getByLabelText("Note (0 - 20)")).toBeInTheDocument();
  });

  it("submits a new grade", async () => {
    render(
      <GradeFormDialog
        mode="create"
        onSaved={mockSubmit}
        open={true}
        setOpen={vi.fn()}
      />
    );

    fireEvent.change(screen.getByLabelText("Numéro d'inscription"), {
      target: { value: "STD-2025-256" },
    });
    fireEvent.change(screen.getByLabelText("Titre du cours"), {
      target: { value: "SVT" },
    });
    fireEvent.change(screen.getByLabelText("Note (0 - 20)"), {
      target: { value: "17" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Créer" }));

    // this have a problem to fix later...
    // await waitFor(() => {
    //   expect(api.post).toHaveBeenCalledWith(
    //     `/grades/`,
    //     { withCredentials: true }
    //   );
    // });
  });

  it("prefills data in update mode", () => {
    const grade: Grade = {
      id: "5",
      studentRegistration: "STD-001-2025",
      courseTitle: "Physique",
      value: 18,
      comment: "",
      createdAt: new Date(2025, 11, 2),
      updatedAt: new Date(2025, 11, 10),
    };

    render(
      <GradeFormDialog
        mode="update"
        defaultValues={grade}
        onSaved={mockSubmit}
        open={false}
        setOpen={vi.fn()}
      />
    );

    expect(screen.getByDisplayValue("STD-001-2025")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Physique")).toBeInTheDocument();
    expect(screen.getByDisplayValue("18")).toBeInTheDocument();
  });
});
