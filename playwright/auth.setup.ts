import {test as setup} from '@playwright/test';

const authFile = '.auth/user.json';

setup('authenticate', async ({page}) => {
  await page.goto('test.mega.gepardec.com')
  await page.getByLabel('Anmelden').click();
  await page.getByLabel('Username or email').fill('mega.test@gepardec.com');
  await page.getByLabel('Password').fill('foobar');
  await page.getByLabel('Sign In').click();
  await page.getByLabel('Mein MEGA').isVisible();
  await page.context().storageState({ path: authFile });
});
