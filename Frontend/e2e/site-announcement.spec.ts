import { test, expect } from "@playwright/test";
import { appUrl } from "./test.config";

test.describe("Announcements page", () => {
  // Check if we visit the good url
  test.beforeEach(async ({ page }) => {
    await page.goto(`${appUrl}/announcements`);
  });

  // display loader when announcements are loading
  test("should show loading", async ({ page }) => {
    await page.route("**/api/announcements", async (route) => {
      await new Promise((r) => setTimeout(r, 2000));
      await route.fulfill({
        status: 200,
        body: JSON.stringify([]),
      });
    });

    await page.goto(`${appUrl}/announcements`);

    await expect(
      page.getByText("Chargement des annonces. Veillez patientez un moment...")
    ).toBeVisible();
  });

  // get message when there's no announcements in database storage, received by calling backend API
  test("should show empty state", async ({ page }) => {
    await page.route("**/api/announcements", (route) => {
      route.fulfill({
        status: 200,
        body: JSON.stringify([]),
      });
    });

    await page.goto(`${appUrl}/announcements`);

    await expect(page.getByText("0 annonce")).toBeVisible();
    await expect(page.getByText("Pas d'annonce pour le moment.")).toBeVisible();
  });

  // showing announcements in card
  test("should show announcement cards", async ({ page }) => {
    await page.route("**/api/announcements", (route) => {
      route.fulfill({
        status: 200,
        body: JSON.stringify([
          { id: 1, title: "Réunion département", description: "Urgent" },
        ]),
      });
    });

    await page.goto(`${appUrl}/announcements`);

    await expect(page.getByText("Réunion département")).toBeVisible();
    await expect(page.getByText("Urgent")).toBeVisible();
    await expect(page.getByRole("button", { name: "Voir" })).toBeVisible();
  });
});
