import {test,expect} from '@playwright/test'
import { chromium } from '@playwright/test'

let browser;
let context;
let page;

test.beforeAll(async()=>{
    //launch chrome before all tests
    browser=await chromium.launch({headless:true})
    console.log("Before all hooks launched chrome browser")

})
test.beforeEach(async()=>{
    //create context for a browser
    context=await browser.newContext()
    //create new page
    page=await context.newPage()
    //navigate to test url
    await page.goto('https://the-internet.herokuapp.com/')
    console.log("Before each hooks launched chrome browser")
    await page.pause()
})
test.afterEach(async()=>{
    //close page and context
    await page.close()
    await context.close()
    console.log("after each hook closed page")
})
test.afterAll(async()=>{
    //close browser
    await browser.close()
})
test('A/B test', async () => {
    await page.click('text=A/B Testing');
    const header = await page.textContent('h3');
    expect(header).toBe('A/B Test Control');
});

test('Test box verification', async () => {
    await page.click('text=Checkboxes');
    const checkbox = await page.isChecked('input[type="checkbox"]:first-child');
    expect(checkbox).toBe(false);
});