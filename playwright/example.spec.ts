import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('go to orf.at', async ({ page }) => {
  await page.goto('https://orf.at/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/ORF.at/);
})

test('test', async ({ page }) => {
  await page.goto('https://orf.at/');
  await page.getByRole('button', { name: 'Annehmen und Schließen:' }).click();
  await page.getByRole('button', { name: 'ÖVP-Finanzstaatssekretärin: „' }).click();
  await expect(page.getByText('Finanzstaatssekretärin Barbara Eibinger-Miedl (ÖVP) ist wenig optimistisch,')).toBeVisible();
});
