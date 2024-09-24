import { test, expect } from "@playwright/test";

test.describe("Practice Task", () => {
  test.beforeEach(async ({ page }) => {
    //https://username:password@url- We can embade credentials into the url
    //  await page.goto("https://automation-user:123abc@qa.sep.tdtm.cydeo.com/taws");
    //encoding credentials in Base64 format we can add as a header
    let encodedCredentials = Buffer.from("automation-user:123abc").toString(
      "base64"
    );

    //set up an authentication header
    await page.setExtraHTTPHeaders({
      Authorization: `Basic ${encodedCredentials}`,
    });
    await page.goto("https://qa.sep.tdtm.cydeo.com/taws");
    //1. Navigate to https://qa.sep.tdtm.cydeo.com/taws (Web based Authentication is needed)
  });

  test("Verify that title is Checkout | Cydeo", async ({ page }) => {
    //2. Verify that title is "Checkout | Cydeo"
    expect(await page.title()).toBe("Checkout | Cydeo");
  });

  test("Verify Payment plan Page ", async ({ page }) => {
    //first name
    let firstName = page.locator("//input[@id='mat-input-0']");
    await firstName.fill("John");
    //last name
    let lastName = page.locator("//input[@id='mat-input-1']");
    await lastName.fill("Doe");
    //email
    let email = page.locator("//input[@id='mat-input-2']");
    await email.fill("john.doe@example.com");
    //phone
    let phone = page.locator("//input[@id='mat-input-3']");
    await phone.fill("1234567890");
    //question
    let dropdown = page.locator(
      "//div[@class='mat-mdc-select-arrow ng-tns-c2400438669-5']"
    );
    await dropdown.click();
    await page.waitForTimeout(3000);
    //select email option
    let option = page.locator(
      "//mat-option[@value='email' and normalize-space()='Email']"
    );
    await option.click();
    await page.waitForTimeout(3000);
    //next button
    let nextButton = page.locator("//button[@class='next-button']");
    //3. Click Next button from Start application step to navigate to Payment Plans step
    await nextButton.click();
    await page.waitForTimeout(3000);
    //4. Verify that the Next button is disabled by default

    let nextButtondisabled = page.locator(
      "//button[@class='next-button disabledButton']"
    );
    await expect(nextButtondisabled).toBeDisabled();
    //5. Select one of the payment option
    let upfront = page.locator(
      "//mat-panel-title[contains(@class, 'payment-panel-title')]//span[@class='payment-type' and normalize-space()='Upfront']"
    );
    await upfront.click();
    await page.waitForTimeout(3000);
    //6. Verify that the Next button is enabled
    let nextButtonEnabled = page.locator("(//button[@class='next-button'])[2]");
    await expect(nextButtonEnabled).toBeEnabled();
    //7. Click Next button from Payment plan step to navigate to Review step
    await nextButtonEnabled.click();
    await page.waitForTimeout(3000);
    // 8. Verify that the terms & conditions check box is unchekced by default
    let checkboxNotChecked = page.locator(
      "//input[@id='defaultCheck2' and @type='checkbox']"
    );

    expect(await checkboxNotChecked.isChecked()).toBeFalsy()
    await page.waitForTimeout(3000);
    //9. Enter card informations
    //iframe
    let myframe1 = page.frameLocator(
      "//div[@class='__PrivateStripeElement']/iframe"
    );
    let cardNumber = myframe1.locator("//input[@id='Field-numberInput']");
    await page.waitForTimeout(3000);
    await cardNumber.fill("4242424242424242");
    await page.waitForTimeout(3000);
    let expiryDate = myframe1.locator("//input[@id='Field-expiryInput']");
    await expiryDate.fill("12/25");

    let cvc = myframe1.locator("//input[@id='Field-cvcInput']");
    await cvc.fill("123");

    let zipCode = myframe1.locator("//input[@id='Field-postalCodeInput']");
    await zipCode.fill("92656");

    //10. Check the terms & conditions check box
    await checkboxNotChecked.check();

    //11.Click Pay button
    let payButton = page.locator("//span[.='Pay']");
    await payButton.click();

    //12. Verify that the payment made successfully
    let successfull = page.locator("//p[.='Payments confirmation ']");
    await expect(successfull).toHaveText("Payments confirmation");
  });
});