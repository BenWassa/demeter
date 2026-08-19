import { test, expect } from '@playwright/test';

test('visual audit compares legacy/current, supports undo and exports JSON', async ({ page },testInfo) => {
  await page.addInitScript(()=>localStorage.removeItem('demeter.visual-audit.v1'));
  await page.goto('/visual-audit.html');
  await expect(page.getByRole('heading',{level:1})).toContainText('Choose what Demeter should actually keep');
  await page.waitForFunction(()=>document.documentElement.classList.contains('audit-ready'),null,{timeout:15000});
  const items=page.locator('.audit-item');
  await expect(items).toHaveCount(9);

  const first=items.first();
  const legacySelect=first.locator('[data-select="legacy"]');
  await expect(legacySelect).toBeEnabled();
  await expect(first.locator('.audit-variant img')).toHaveCount(2);
  await expect.poll(async()=>first.locator('.audit-variant img').evaluateAll(imgs=>imgs.every(img=>img.complete&&img.naturalWidth>0))).toBe(true);
  await expect(page.locator('[data-item="acre10"] .audit-variant')).toHaveCount(5);

  await legacySelect.click();
  await first.locator('[data-outcome="keep"]').click();
  let json=JSON.parse(await page.locator('#audit-json').inputValue());
  expect(json.reviews.region.preferredVariant).toBe('legacy');
  expect(json.reviews.region.outcome).toBe('keep');

  await first.locator('[data-select="current"]').click();
  json=JSON.parse(await page.locator('#audit-json').inputValue());
  expect(json.reviews.region.preferredVariant).toBe('current');
  await page.getByRole('button',{name:'Undo'}).click();
  json=JSON.parse(await page.locator('#audit-json').inputValue());
  expect(json.reviews.region.preferredVariant).toBe('legacy');

  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
  await page.screenshot({path:`artifacts/${testInfo.project.name}-visual-audit.png`,fullPage:true});
});
