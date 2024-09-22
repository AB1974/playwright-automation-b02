import { expect, test } from "@playwright/test";

test.describe("Alert Tests", () => {
  // create beforeEach
  test.beforeEach(async ({ page }) => {
    await page.goto("https://practice.cydeo.com/javascript_alerts");
  });

  test("Handling JS Alert Test", async ({ page }) => {
    page.on("dialog", async (alert) => {
      console.log(alert.message());
      await page.waitForTimeout(3000);
      await alert.accept();
    });

    let clickForJSAlertButton = page.locator("//button[@onclick='jsAlert()']");

    await clickForJSAlertButton.click(); // triggers the alert

    // pase for 3 sconds
    await page.waitForTimeout(3000);

    await expect(
      page.locator("text='You successfully clicked an alert'")
    ).toBeVisible();
  });

  test("Handling JS Confirm Test", async ({ page }) => {
    page.on("dialog", async (alert) => {
      console.log(alert.message());
      await page.waitForTimeout(3000);
      await alert.dismiss();
    });

    let clickForJSConfirmButton = page.locator(
      "//button[@onclick='jsConfirm()']"
    );

    await clickForJSConfirmButton.click();

    await page.waitForTimeout(3000);

    await expect(page.locator("text='You clicked: Cancel'")).toBeVisible();
  });

  test("Handling JS Prompt Test", async ({ page }) => {
    page.on("dialog", async (alert) => {
      console.log(alert.message());
      await page.waitForTimeout(3000);
      await alert.accept("Hello CYDEO");
    });

    let clickForJSPromptButton = page.locator(
      "//button[@onclick='jsPrompt()']"
    );

    await clickForJSPromptButton.click();

    await page.waitForTimeout(3000);

    await expect(page.locator("text='You entered: Hello CYDEO'")).toBeVisible();
  });
});

// come back at 1:20 pm EST
