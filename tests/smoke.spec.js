import { test, expect } from '@playwright/test';

async function ready(page) {
  await page.goto('/');
  await page.waitForFunction(() => document.documentElement.classList.contains('v2-ready'));
  await page.waitForSelector('#visual-atlas');
}

async function overflowReport(page) {
  return page.evaluate(() => {
    const viewport = document.documentElement.clientWidth;
    const total = document.documentElement.scrollWidth;
    const offenders = [...document.querySelectorAll('body *')]
      .map((el) => {
        const r = el.getBoundingClientRect();
        return {
          tag: el.tagName.toLowerCase(),
          id: el.id || '',
          cls: typeof el.className === 'string' ? el.className.slice(0, 100) : '',
          left: Math.round(r.left),
          right: Math.round(r.right),
          width: Math.round(r.width),
          scrollWidth: el.scrollWidth
        };
      })
      .filter((x) => x.left < -1 || x.right > viewport + 1)
      .sort((a, b) => Math.max(b.right - viewport, -b.left) - Math.max(a.right - viewport, -a.left))
      .slice(0, 20);
    return { viewport, total, overflow: total - viewport, offenders };
  });
}

test('core Demeter planning paths work', async ({ page }, testInfo) => {
  await ready(page);
  await expect(page.getByRole('heading', { level:1 })).toContainText('Design the land around the life');

  const report = await overflowReport(page);
  if (report.overflow > 1) console.log('OVERFLOW_DIAGNOSTIC', JSON.stringify(report));
  expect(report.overflow).toBeLessThanOrEqual(1);

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

test('visual atlas opens full screen and zoom controls work', async ({ page }) => {
  await ready(page);
  const card = page.getByRole('button', { name:/Open Region comparison full screen/ });
  await card.click();
  const dialog = page.locator('#visual-lightbox');
  await expect(dialog).toBeVisible();
  await expect(page.locator('#visual-lightbox-heading')).toHaveText('Region comparison');
  await expect(page.locator('#visual-zoom-level')).toHaveText('100%');
  await page.getByRole('button', { name:'Zoom in' }).click();
  await expect(page.locator('#visual-zoom-level')).toHaveText('125%');
  await page.keyboard.press('0');
  await expect(page.locator('#visual-zoom-level')).toHaveText('100%');
  await page.getByRole('button', { name:'Close full-screen image' }).click();
  await expect(dialog).not.toBeVisible();
  await expect(card).toBeFocused();
});
