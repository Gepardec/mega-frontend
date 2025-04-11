import { test, expect } from '@playwright/test';

// test.use({
//   storageState: 'playwright/.auth/user.json'
// });

test('Monatsabschluss mit Kommentar', async ({ page }) => {
  // await page.route('https://gepardec-sso-qa.apps.cloudscale-lpg-2.appuio.cloud/realms/gepardec/protocol/openid-connect/token', async (route) => {
  //   const json =
  //     {
  //       'access_token': 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJyY041VDJJNFZNc2ItYTBKQUttRUZOQXRSb0xsSFZNQ3dwVmdLYVVNSWljIn0.eyJleHAiOjE3NDQzNjIwOTgsImlhdCI6MTc0NDM2MTc5OCwiYXV0aF90aW1lIjoxNzQ0MzYxNzk3LCJqdGkiOiJkMTBjNDc4YS03OTY5LTQwNjgtOTMyMi05N2RiYzNlOTVjMjQiLCJpc3MiOiJodHRwczovL2dlcGFyZGVjLXNzby1xYS5hcHBzLmNsb3Vkc2NhbGUtbHBnLTIuYXBwdWlvLmNsb3VkL3JlYWxtcy9nZXBhcmRlYyIsImF1ZCI6Im1lZ2EiLCJzdWIiOiI4NTkwY2M4NS0yNmMwLTRmMzctOTEzYi1hOTVmNjM2ZjljMWMiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJtZWdhIiwibm9uY2UiOiJORzVrTG1KUE5raExaa0Z1VnpWUVRHUjRVR010WjJNM2JYaHFWVTR0UTJ4RWVYbEdiWHBLWTBWVk1IWXgiLCJzZXNzaW9uX3N0YXRlIjoiZjA4MWRhYjYtM2VlOC00MzFiLTkwYWQtY2JkZGZkNWEzZjdlIiwic2NvcGUiOiJvcGVuaWQgbWljcm9wcm9maWxlLWp3dCBwcm9maWxlIGVtYWlsIiwic2lkIjoiZjA4MWRhYjYtM2VlOC00MzFiLTkwYWQtY2JkZGZkNWEzZjdlIiwidXBuIjoibWVnYS50ZXN0QGdlcGFyZGVjLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYW1lIjoiTWVnYSBUZXN0IiwiZ3JvdXBzIjpbImRlZmF1bHQtcm9sZXMtZ2VwYXJkZWMiLCJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl0sInByZWZlcnJlZF91c2VybmFtZSI6Im1lZ2EudGVzdEBnZXBhcmRlYy5jb20iLCJnaXZlbl9uYW1lIjoiTWVnYSIsImZhbWlseV9uYW1lIjoiVGVzdCIsImVtYWlsIjoibWVnYS50ZXN0QGdlcGFyZGVjLmNvbSJ9.rdEkWXLRNN-oPMjMZz1JbcBv-8coxV0-mLPcpc0yUBhN0zjTulBz3rcvA_bbLaB4s6psISOugq0uJNpH_HF73o05P00gNAW5kbf-w7JuqAVtN03DIXwCNtiJ1Nk9E9fDaUd8Xspx5fDB2nTEuP3YxZeHviXKQksCQXsRyAxBrLyRM9aVBJZx-rVQ0pG4f36ZJVb8PLw0yPSC6kC--Ou1VMFQdU3n9sQc0QDA92c_30FpHYwi_X-UXKrd0xAzbTSpgDRJPuKtlt9O9zIfZ9U_7AME4WqqTukD4krU4RyN3KRUddE4AxinjR1ES12zAXgi2_w85uBnpPaRYlnse1UH4g',
  //       'expires_in': 300,
  //       'refresh_expires_in': 1800,
  //       'refresh_token': 'eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJlODJlMjJmMi0zNzhkLTQyYjEtODkxYy03NGQ3NTMxZDU5ZjUifQ.eyJleHAiOjE3NDQzNjM1OTgsImlhdCI6MTc0NDM2MTc5OCwianRpIjoiNjcyZjIwOTEtOTU3Ni00MTkyLWE4MTYtNzc5M2UwYTYzMTIwIiwiaXNzIjoiaHR0cHM6Ly9nZXBhcmRlYy1zc28tcWEuYXBwcy5jbG91ZHNjYWxlLWxwZy0yLmFwcHVpby5jbG91ZC9yZWFsbXMvZ2VwYXJkZWMiLCJhdWQiOiJodHRwczovL2dlcGFyZGVjLXNzby1xYS5hcHBzLmNsb3Vkc2NhbGUtbHBnLTIuYXBwdWlvLmNsb3VkL3JlYWxtcy9nZXBhcmRlYyIsInN1YiI6Ijg1OTBjYzg1LTI2YzAtNGYzNy05MTNiLWE5NWY2MzZmOWMxYyIsInR5cCI6IlJlZnJlc2giLCJhenAiOiJtZWdhIiwibm9uY2UiOiJORzVrTG1KUE5raExaa0Z1VnpWUVRHUjRVR010WjJNM2JYaHFWVTR0UTJ4RWVYbEdiWHBLWTBWVk1IWXgiLCJzZXNzaW9uX3N0YXRlIjoiZjA4MWRhYjYtM2VlOC00MzFiLTkwYWQtY2JkZGZkNWEzZjdlIiwic2NvcGUiOiJvcGVuaWQgbWljcm9wcm9maWxlLWp3dCBwcm9maWxlIGVtYWlsIiwic2lkIjoiZjA4MWRhYjYtM2VlOC00MzFiLTkwYWQtY2JkZGZkNWEzZjdlIn0.1WEgBkpYwY9vr0AUAhJL8x0OZQ9AGSXb01-hklLN7Tw',
  //       'token_type': 'Bearer',
  //       'id_token': 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJyY041VDJJNFZNc2ItYTBKQUttRUZOQXRSb0xsSFZNQ3dwVmdLYVVNSWljIn0.eyJleHAiOjE3NDQzNjIwOTgsImlhdCI6MTc0NDM2MTc5OCwiYXV0aF90aW1lIjoxNzQ0MzYxNzk3LCJqdGkiOiJlNDYyNDVlMS1kYTQwLTQ2YzYtYWExMi04NDg3ZmNiNWU4MWEiLCJpc3MiOiJodHRwczovL2dlcGFyZGVjLXNzby1xYS5hcHBzLmNsb3Vkc2NhbGUtbHBnLTIuYXBwdWlvLmNsb3VkL3JlYWxtcy9nZXBhcmRlYyIsImF1ZCI6Im1lZ2EiLCJzdWIiOiI4NTkwY2M4NS0yNmMwLTRmMzctOTEzYi1hOTVmNjM2ZjljMWMiLCJ0eXAiOiJJRCIsImF6cCI6Im1lZ2EiLCJub25jZSI6Ik5HNWtMbUpQTmtoTFprRnVWelZRVEdSNFVHTXRaMk0zYlhocVZVNHRRMnhFZVhsR2JYcEtZMFZWTUhZeCIsInNlc3Npb25fc3RhdGUiOiJmMDgxZGFiNi0zZWU4LTQzMWItOTBhZC1jYmRkZmQ1YTNmN2UiLCJhdF9oYXNoIjoiY1g2Mk9uRWszT2RSVmdUclpZeEwzUSIsInNpZCI6ImYwODFkYWI2LTNlZTgtNDMxYi05MGFkLWNiZGRmZDVhM2Y3ZSIsInVwbiI6Im1lZ2EudGVzdEBnZXBhcmRlYy5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1lZ2EgVGVzdCIsImdyb3VwcyI6WyJkZWZhdWx0LXJvbGVzLWdlcGFyZGVjIiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtZWdhLnRlc3RAZ2VwYXJkZWMuY29tIiwiZ2l2ZW5fbmFtZSI6Ik1lZ2EiLCJmYW1pbHlfbmFtZSI6IlRlc3QiLCJlbWFpbCI6Im1lZ2EudGVzdEBnZXBhcmRlYy5jb20ifQ.VL-9E7XUWbdV4EFVQjWE3tG8Hs_EBSnMZFBd8h12yEmpZToKNEyfDVvThZgK-HY0zMV4gbVWqi6Lww_V1PLJ-zARb3pgW-EWAAJODhOo6HUnDUJgYshiD63pMYby0K59QVDbjCFty4HT5hT7LCCA7-5yIgfRn3qJErQm-ZzHsvAWsPVD7XbzYlI1ZcR7kCTXJAEJLlrOOlcMMPOmhQuinXHheB0pqe5b15JO-CW6Yi__6yBVb4y1do4OWh0Aprs90R4Wp8FiVhAoNEFv0OHFGwgcnsRgmQBIO-medlSk1MPBnJyuWLXe5me7Sn84gQ2viExZalrpYw3DmTqy1yV1lQ',
  //       'not-before-policy': 0,
  //       'session_state': 'f081dab6-3ee8-431b-90ad-cbddfd5a3f7e',
  //       'scope': 'openid microprofile-jwt profile email'
  //     };
  //   await route.fulfill({ json });
  // })
  await page.routeFromHAR('./hars/monatsabschluss.har', {
    url: 'https://mega-backend-qa.apps.cloudscale-lpg-2.appuio.cloud/**',
    update: false,
  });
  await page.goto('https://mega-frontend-qa.apps.cloudscale-lpg-2.appuio.cloud/login');
  await page.getByRole('button', { name: 'Anmelden' }).click();
  await page.getByRole('button', { name: 'Buchungen bestätigen' }).isVisible();
  await page.getByRole('button', { name: 'Buchungen bestätigen' }).click();
  await page.getByText('Die Kontrolle deiner Zeiten').isVisible();
  await page.getByRole('tab', { name: 'Office Management' })/*.locator('span').nth(1)*/.click();
  await page.getByRole('cell').filter({ hasText: 'MA Checkcheck_circle' }).locator('mat-icon').isVisible();
  await page.getByRole('row', { name: 'Mega Test Offen' }).getByLabel('Offen');
  await page.getByRole('option', { name: 'Fertig' }).click();
  // await page.locator('#mat-select-value-47').getByText('Fertig').click();
  await page.getByRole('row', { name: 'Mega Test Fertig comment 2025-03-' }).getByLabel('comment').click();
  await page.getByRole('textbox', { name: 'Anmerkung verfassen' }).click();
  await page.getByRole('textbox', { name: 'Anmerkung verfassen' }).fill('Playwright');
  await page.getByRole('button', { name: 'Anmerkung hinzufügen' }).click();
  await page.getByRole('button', { name: 'Schließen' }).click();
  // await page.getByRole('button', { name: 'Neu laden' }).click();
  await page.getByRole('tab', { name: 'Mein MEGA' }).click();
  await page.getByText('Deine Zeiten wurden').isVisible();
});
