import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { adminService } from "../src/services/admin";
import { DeleteAdmin } from "../src/app/_components/private/admin-dialog"
import "@testing-library/jest-dom"

vi.mock("../src/services/admin", () => ({
  adminService: { delete: vi.fn() },
}));

describe("DeleteAdmin", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("opens the dialog and deletes admin", async () => {
    (adminService.delete as any).mockResolvedValue(true);

    render(
      <DeleteAdmin id="admin-123" />
    );

    fireEvent.click(screen.getByRole("button", { name: /Supprimer mon compte/i }));

    expect(await screen.findByText(/Êtes-vous sûr/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Supprimer définitivement/i }));

    await waitFor(() => vi.fn());
  });
});
