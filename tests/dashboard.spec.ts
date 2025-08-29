import { test, expect } from '@playwright/test';

test.describe('Dashboard', () => {
  test('should load dashboard page', async ({ page }) => {
    await page.goto('http://localhost:3001/dashboard/overview');
    
    // Check if the page loads (wait for content to be visible)
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
    
    // Check if the URL is correct
    await expect(page).toHaveURL(/.*dashboard\/overview/);
  });

  test('should display dashboard cards', async ({ page }) => {
    await page.goto('http://localhost:3001/dashboard/overview');
    
    // Check if all dashboard cards are present
    await expect(page.getByText('Collected')).toBeVisible();
    await expect(page.getByText('Pending')).toBeVisible();
    await expect(page.getByText('Total Invoices')).toBeVisible();
    await expect(page.getByText('Total Customers')).toBeVisible();
  });

  test('should display revenue chart', async ({ page }) => {
    await page.goto('http://localhost:3001/dashboard/overview');
    
    // Wait for the revenue chart to load by checking for the heading
    await expect(page.getByRole('heading', { name: 'Recent Revenue' })).toBeVisible();
    
    // Check if revenue chart content is visible
    await expect(page.getByText('Last 12 months')).toBeVisible();
  });

  test('should display latest invoices', async ({ page }) => {
    await page.goto('http://localhost:3001/dashboard/overview');
    
    // Wait for latest invoices to load by checking for the heading
    await expect(page.getByRole('heading', { name: 'Latest Invoices' })).toBeVisible();
    
    // Check if latest invoices content is visible
    await expect(page.getByText('Updated just now')).toBeVisible();
  });
});
