import { test, expect } from "@playwright/test";
import { appUrl } from "./test.config";

test.describe("Login page", () => {
  // Check if we visit the good url
  test.beforeEach(async ({ page }) => {
    await page.goto(`${appUrl}/login`);
  });

  // just showing page content
  test("should render login page content", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Connecte toi à ton compte" })
    ).toBeVisible();

    await expect(
      page.getByText("Entrez vous identifiants pour pouvoir continuer")
    ).toBeVisible();

    await expect(page.getByPlaceholder("benja@gmail.com")).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.getByRole("button", { name: "Se connecter" })).toBeVisible();
  });

  // testing with wrong credentials here
  test("should show error when credentials are wrong", async ({ page }) => {
    await page.route("**/api/auth/login", (route) => {
      route.fulfill({
        status: 401,
        body: JSON.stringify({ message: "Invalid credentials" }),
      });
    });

    await page.fill('input[name="email"]', "wrong@gmail.com");
    await page.fill('input[name="password"]', "wrongpass");
    await page.getByRole("button", { name: "Se connecter" }).click();

    await expect(page.getByText("Email ou mot de passe invalide")).toBeVisible();
  });

  // testing on api response
  test("should login successfully", async ({ page }) => {
    await page.route("**/api/auth/login", (route) => {
      route.fulfill({
        status: 200,
        body: JSON.stringify({
          token: "sdklfjsdkljfklsdhfklsdnfksdhkfsdjkksdjfj2348iuio",
          role: "STUDENT",
          email: "benja@gmail.com",
        }),
      });
    });

    await page.fill('input[name="email"]', "benja@gmail.com");
    await page.fill('input[name="password"]', "password123");
    await page.getByRole("button", { name: "Se connecter" }).click();

    await expect(page).toHaveURL(`${appUrl}/profile`);
  });
});
