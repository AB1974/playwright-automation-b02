import { test, expect } from "@playwright/test";

test.describe("Test Group", () => {
  // create a beforeEach
  test.beforeEach(async ({ page }) => {
    await page.goto("https://practice.cydeo.com/");
  });

  test("getAttribute() retrives the attribute value", async ({ page }) => {
    console.log(await page.locator("text='A/B Testing'").getAttribute("href"));

    console.log(await page.locator("text='Home'").getAttribute("class"));
  });

  test("state methods of locator", async ({ page }) => {
    let testAutomationPractice = page.locator("//span[@class='h1y']");

    console.log(await testAutomationPractice.isVisible());

    expect(await testAutomationPractice.isVisible()).toBeTruthy(); // verifies that the element is visible

    await expect(testAutomationPractice).toBeVisible(); // passing webElement to the expect

    console.log("--------------------------------");

    let autoComplete = page.locator("text='Autocomplete'");

    console.log(await autoComplete.isEnabled());

    expect(await autoComplete.isEnabled()).toBeTruthy(); // verifies that the element is enabled

    await expect(autoComplete).toBeEnabled(); // verifies that the element is enabled

    console.log("--------------------------------");

    await page.locator("text='Checkboxes'").click();

    let checkBox1 = page.locator("//input[@type='checkbox' and @id='box1']");
    let checkBox2 = page.locator("//input[@type='checkbox' and @id='box2']");

    // verify that checkbox1 is unchecked by default
    expect(await checkBox1.isChecked()).toBeFalsy();
    await expect(checkBox1).not.toBeChecked();

    // verify that checkBox2 is checked by default
    expect(await checkBox2.isChecked()).toBeTruthy();
    await expect(checkBox2).toBeChecked();
  });
});
