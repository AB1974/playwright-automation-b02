import { test } from "@playwright/test";

test("Get Title", async ({ page }) => {
  // Your test steps go here
  await page.goto("https://practice.cydeo.com/");
  let actualTitle = await page.title();
  console.log(actualTitle);

 //  expect(actualTitle).toBe("Practice");
 await page.setDefaultTimeout(3000);

});

test("get Url", async ({ page }) => {
  // Your test steps go here
await page.goto("https://practice.cydeo.com/");
let actualURL = page.url();
console.log(actualURL);
 await page.setDefaultTimeout(3000);
});
test("How to Set Size Window", async ({ page }) => {
  // Your test steps go here
  await page.goto("https://practice.cydeo.com/");
  await  page.setViewportSize({width:1920,height:1080});
   await page.setDefaultTimeout(3000);
});