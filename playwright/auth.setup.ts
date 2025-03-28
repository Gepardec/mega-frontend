import { test as testSetup, expect } from '@playwright/test';

import { join } from 'path';
import { config } from 'dotenv';

// env datei laden
config();

// hier wird auth info gespeichert (cookies, ...)
const authFile = join(__dirname, '../playwright/.auth/user.json');

testSetup('authenticate', async ({page}) => {
  await page.goto(process.env.URL);

  await page.getByRole('button', { name: 'Anmelden' }).click();
  await page.getByRole('textbox', { name: 'Username or email' }).fill(process.env.USERNAME);
  await page.getByRole('textbox', { name: 'Password' }).fill(process.env.PASSWORD);
  await page.getByRole('button', { name: 'Sign In' }).click();

  // irgendwas davon testen -> wenn erfolgreich -> login works
  await expect(page.getByRole('img', { name: 'Logo MEGA' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Mega Test' })).toBeVisible();
  await expect(page.locator('mat-toolbar')).toContainText('Mega Test');

  // save storage
  await page.context().storageState({ path: authFile });
});
