import { expect, test, type Page } from "@playwright/test";

// Fixture: 10 talks + 4 workshops with `pagination.pageSize: 6`.
const cards = (page: Page) => page.locator(".sw-main").getByRole("link");
const pagination = (page: Page) =>
  page.getByRole("navigation", { name: "Pagination" });

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("shows the first page of slides based on pageSize", async ({ page }) => {
  await expect(cards(page)).toHaveCount(6);
  await expect(cards(page).first()).toContainText("Talk 01");
  await expect(page.getByRole("button", { name: "Page 1" })).toHaveAttribute(
    "aria-current",
    "page",
  );
  await expect(
    pagination(page).getByRole("button", { name: "Previous page" }),
  ).toBeDisabled();
});

test("navigates with next and page number buttons", async ({ page }) => {
  await pagination(page).getByRole("button", { name: "Next page" }).click();
  await expect(cards(page)).toHaveCount(6);
  await expect(cards(page).first()).toContainText("Talk 07");
  await expect(page.getByRole("button", { name: "Page 2" })).toHaveAttribute(
    "aria-current",
    "page",
  );

  await page.getByRole("button", { name: "Page 3" }).click();
  await expect(cards(page)).toHaveCount(2);
  await expect(cards(page).first()).toContainText("Workshop 03");
  await expect(
    pagination(page).getByRole("button", { name: "Next page" }),
  ).toBeDisabled();
});

test("resets to the first page when searching", async ({ page }) => {
  await page.getByRole("button", { name: "Page 3" }).click();
  await page.getByPlaceholder("Search slides...").fill("Talk");

  await expect(cards(page)).toHaveCount(6);
  await expect(cards(page).first()).toContainText("Talk 01");
  await expect(page.getByRole("button", { name: "Page 1" })).toHaveAttribute(
    "aria-current",
    "page",
  );
});

test("hides pagination when results fit on one page", async ({ page }) => {
  await page.getByRole("button", { name: "workshops" }).click();

  await expect(cards(page)).toHaveCount(4);
  await expect(pagination(page)).toBeHidden();
});
