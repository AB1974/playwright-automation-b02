import {test} from '@playwright/test';

test('descrition', async({page})=>{
   await  page.goto("https://google.com/");

   await page.waitForTimeout(3000);

   let searchBox = page.locator("//textarea[@class='gLFyf']");
   //enter playwright to search box 
   await searchBox.fill("playwright");
   await page.waitForTimeout(3000);
 
  

});