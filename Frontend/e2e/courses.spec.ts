import { test, expect } from "@playwright/test";
import { appUrl } from "./test.config";

test.describe("Courses page", () => {
  // Check if we visit the good url
  test.beforeEach(async ({page}) => {
    await page.goto(`${appUrl}/all-courses`);
  });

  // On loading courses
  test("should show loading state", async ({ page }) => {
    await page.route("**/api/courses", async (route) => {
      await new Promise((r) => setTimeout(r, 2000));
      await route.fulfill({
        status: 200,
        body: JSON.stringify([]),
      });
    });

    await page.goto(`${appUrl}/all-courses`);

    await expect(
      page.getByText("Chargement des cours. Veillez patientez un moment...")
    ).toBeVisible();
  });

  // if there are no courses to show
  test("should show empty state", async ({ page }) => {
    await page.route("**/api/courses", (route) => {
      route.fulfill({
        status: 200,
        body: JSON.stringify([]),
      });
    });

    await page.goto(`${appUrl}/all-courses`);

    await expect(page.getByText("0 cours")).toBeVisible();
    await expect(page.getByText("Pas de cours pour le moment.")).toBeVisible();
  });

  // displaying courses in card
  test("should display courses in cards", async ({ page }) => {
    await page.route("**/api/courses", (route) => {
      route.fulfill({
        status: 200,
        body: JSON.stringify([
          { id: 1, title: "Maths", teacherName: "Prof A" },
          { id: 2, title: "Physique", teacherName: "Prof B" },
        ]),
      });
    });


    await expect(page.getByText("Maths")).toBeVisible();
    await expect(page.getByText("Physique")).toBeVisible();
    await expect(page.getByRole("button", { name: "Voir" })).toHaveCount(2);
    await expect(page.getByRole("button", { name: "S'inscrire" })).toHaveCount(2);
  });
});