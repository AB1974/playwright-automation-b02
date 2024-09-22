import { test,expect } from '@playwright/test';

test.describe('Array of Elements', () => {
let elements;
    test.beforeEach(async({page})=>{
      await page.goto("https://practice.cydeo.com/");
      elements = await page.locator("//ul[@class='list-group']/li/a").all(); //returns array
    });
  test("Verify that there are exactly 50 link elements within the <ul> element.", async ({page,
  }) => {
  
  expect(elements.length).toBe(50);
  //another way :
  expect(await page.locator("//ul[@class='list-group']/li").count()).toBe(50);

  });

  test("Verify that each of the 50 link elements within the <ul> elements are visible ", async ({page,
  }) => {

    for(let element of elements){
     await   expect(element).toBeVisible();
   //  expect(await element.isVisible()).toBeTruthy();
    }

  });

  test("Verify that each of the 50 link elements within the <ul> elements are enable ", async ({page,
  }) => {
    for (let i = 0; i < elements.length; i++) {
      await expect(elements[i]).toBeEnabled();
      //   expect(await elements[i].isEnabled()).toBeTruthy;
    }
  });

  test("erify that each of the 50 link elements within the <ul> element has a valid `href` attribute.", async ({page,
  }) => {

    for (let element of elements) {
      let href = await element.getAttribute("href");
      console.log(href);
    //  expect(await element.isVisible()).toBeTruthy();
    }

    elements.forEach(async (element) => {
      let href = await element.getAttribute("href");
      expect(href).toBeTruthy();
      console.log(href);
    });

  });
});

