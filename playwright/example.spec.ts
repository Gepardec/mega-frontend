import { test, expect } from '@playwright/test';

test('shows last month label', async ({ page }) => {

    await page.goto(process.env.URL);

    // Anmelden Button
    await page.getByRole('button').click();

    // Februar 2025
    const lastMonthDate = new Date();
    lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
    const lastMonthYear = new Intl.DateTimeFormat('de-DE', { month: 'long', year: 'numeric' }).format(lastMonthDate);

    await expect(page.locator('app-employee-check')).toContainText(lastMonthYear);
});