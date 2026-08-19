import { test, expect } from '@playwright/test';

async function ready(page) {
  await page.goto('/');
  await page.waitForFunction(() => document.documentElement.classList.contains('v2-ready'));
}

test('core Demeter planning paths work', async ({ page }, testInfo) => {
  await ready(page);
  await expect(page.getByRole('heading', { level:1 })).toContainText('Design the land around the life');

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);

  await page.getByRole('button', { name:'Fully remote' }).click();
  await expect(page.locator('#fit-title')).toBeVisible();

  await page.getByRole('tab', { name:/Fraser Valley/ }).click();
  await expect(page.locator('#region-name')).toHaveText('Fraser Valley');
  await expect(page.locator('#region-sources a')).toHaveCount(4);

  await page.getByRole('button', { name:'3 acres' }).click();
  await expect(page.locator('#plan-label')).toContainText('3-acre');
  const plan3 = await page.locator('#plan-title').textContent();
  await page.getByRole('button', { name:'20 acres' }).click();
  await expect(page.locator('#plan-label')).toContainText('20-acre');
  expect(await page.locator('#plan-title').textContent()).not.toBe(plan3);

  await page.getByRole('tab', { name:'Household' }).click();
  await expect(page.locator('#food-name')).toHaveText('Household food system');
  await page.getByRole('tab', { name:/Raw land/ }).click();
  await expect(page.locator('#arch-name')).toHaveText('Raw land + designed build');

  await page.screenshot({ path:`artifacts/${testInfo.project.name}-atlas.png`, fullPage:true });
});

test('tabs support keyboard navigation', async ({ page }) => {
  await ready(page);
  const first = page.getByRole('tab', { name:/Southwest Ontario/ });
  await first.focus();
  await page.keyboard.press('ArrowRight');
  const second = page.getByRole('tab', { name:/Fraser Valley/ });
  await expect(second).toBeFocused();
  await expect(second).toHaveAttribute('aria-selected','true');
});
