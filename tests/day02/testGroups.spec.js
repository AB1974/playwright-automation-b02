import {test} from "@playwright/test";

test.describe("Test Group 1",()=>{

    test.beforeAll(async()=>{
    console.log("Before All");
    });
    test.afterAll(async () => {
    console.log("After All");
  });

   test.beforeEach(async () => {
     console.log("Before Each");
   });
      test.afterEach(async () => {
        console.log("After Each");
      });


 test("Test case 1 ", async ({ page }) => {
console.log("Test case 1 ");
 });

 test("Test case 2 ", async ({ page }) => {
   console.log("Test case 2 ");
 });
 test("Test case 3 ", async ({ page }) => {
   console.log("Test case 3 ");
 });
    
   


});

