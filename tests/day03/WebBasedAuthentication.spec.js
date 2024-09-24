import { expect, test } from "@playwright/test";

test("By Passing authentication by embdding the credentials in the URL", async ({
  page,
}) => {
  //https://username:password@url
  await page.goto("https://admin:admin@practice.cydeo.com/basic_auth");
  // await page.goto('https://practice.cydeo.com/basic_auth');

  await page.waitForTimeout(5000);

  let congrats = page.locator("//p[contains(text(),'Congratulations!')]");

  await expect(congrats).toBeVisible();
});

test("By passing authentication by encoding credentials in Base64 format", async ({
  page,
}) => {
  // encoding credentials in Base64 format
  let encodedCredentials = Buffer.from("admin:admin").toString("base64");

  // set up the authentication header
  await page.setExtraHTTPHeaders({
    Authorization: `Basic ${encodedCredentials}`,
  });

  await page.goto("https://practice.cydeo.com/basic_auth");

  let congrats = page.locator("//p[contains(text(),'Congratulations!')]");

  await expect(congrats).toBeVisible();
});
