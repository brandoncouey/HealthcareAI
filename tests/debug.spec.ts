import { test, expect } from '@playwright/test';


test.describe("Home Page", () => {
    test("Should have correct metadata and elements", async({page}) => {
        await page.goto('http://localhost:3001/dashboard/overview')
        await expect(page).toHaveTitle('AdminCP')
    })
})