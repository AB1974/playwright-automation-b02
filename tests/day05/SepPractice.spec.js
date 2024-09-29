import { test } from "@playwright/test";

test("sep practice", async ({ page }) => {
  const code = Buffer.from(
    `${process.env.SEP_USERNAME}:${process.env.SEP_PASSWORD}`
  ).toString("base64");

  await page.setExtraHTTPHeaders({
    Authorization: `Basic ${code}`,
  });

  await page.goto(process.env.SEP_URL);

  let first_name_input = page.locator("//input[@formcontrolname='firstName']");

  let last_name_input = page.locator("//input[@formcontrolname='lastName']");

  let email_input = page.locator("//input[@formcontrolname='email']");

  let phone_input = page.locator("//input[@formcontrolname='phoneNumber']");

  await first_name_input.fill("John");

  await last_name_input.fill("Smith");

  await email_input.fill("johnsmith@example.com");

  await phone_input.fill("1234567890");

  let how_did_you_hear_dropdown = page.locator(
    "//mat-label[text()='How did you hear about us?']"
  );

  let email_option = page.locator("//span[text()='Email']");

  await how_did_you_hear_dropdown.click();

  await email_option.click();

  let next_button = page.locator("//button[@type='submit' and text()=' Next']");

  await next_button.click();

  let upfront_payment_plan = page.locator(
    "//mat-expansion-panel-header[.//span[contains(text(), 'Upfront')]]"
  );

  await upfront_payment_plan.click();

  let next_button2 = page.locator(
    "//button[@class='next-button' and text()='Next']"
  );

  await next_button2.click();

  let payment_iframe = page.frameLocator(
    "//iframe[@allow='payment *; publickey-credentials-get *']"
  );

  let card_number_input = payment_iframe.locator(
    "//input[@id='Field-numberInput']"
  );

  await card_number_input.fill(process.env.CARD_NUMBER);

  let expiration_date_input = payment_iframe.locator(
    "//input[@id='Field-expiryInput']"
  );

  await expiration_date_input.fill(process.env.EXPIRATION_DATE);

  let cvc_input = payment_iframe.locator("//input[@id='Field-cvcInput']");

  await cvc_input.fill(process.env.CVC);

  let zip_code_input = payment_iframe.locator(
    "//input[@id='Field-postalCodeInput']"
  );

  await zip_code_input.fill(process.env.ZIP_CODE);

  let terms_conditions_checkbox = page.locator("//input[@type='checkbox']");

  await terms_conditions_checkbox.check();

  let pay_button = page.locator(
    "//button[@type='button' and contains(@class, 'next-button')]"
  );

  await pay_button.click();

  await page.waitForTimeout(3000);
});
