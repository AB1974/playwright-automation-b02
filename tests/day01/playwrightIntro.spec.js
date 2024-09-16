import {test} from '@playwright/test';

test('description', async({page})=>{

   await  page.goto("https://google.com/");

   await page.waitForTimeout(3000);

   let searchBox = page.locator("//textarea[@class='gLFyf']");

   //fill all
   //type types one by one 


   // await searchBox.type("Cydeo");
    await searchBox.fill("Cydeo");
await page.waitForTimeout(3000);
})