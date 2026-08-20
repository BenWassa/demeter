import { test, expect } from '@playwright/test';

const approved={
  region:'assets/visual-guides/region-comparison.png',
  spectrum:'assets/visual-guides/independence-spectrum.png',
  systems:'assets/visual-guides/homestead-systems.png',
  yearOn:'assets/visual-guides/homestead-year-southwest-ontario.png',
  yearBc:'assets/visual-guides/homestead-year-coastal-bc.png'
};

test('approved Field Atlas masters are the rendered artwork', async ({ page }) => {
  await page.goto('/visuals.html');
  await page.waitForFunction(() => document.documentElement.classList.contains('v2-ready'));
  await page.waitForSelector('#visual-atlas');

  for(const [id,source] of Object.entries(approved)){
    const card=page.locator(`[data-visual="${id}"]`);
    const thumb=card.locator('img');
    await expect(thumb).toHaveAttribute('src',/\.svg$/);
    await expect(thumb).toHaveAttribute('srcset',`${source} 1x`);
    await expect.poll(()=>thumb.evaluate(img=>img.currentSrc.endsWith(source))).toBe(true);
    await expect.poll(()=>thumb.evaluate(img=>`${img.naturalWidth}x${img.naturalHeight}`)).toBe('1536x1024');

    await card.click();
    const lightbox=page.locator('#visual-lightbox-image');
    await expect.poll(()=>lightbox.evaluate(img=>img.currentSrc.endsWith(source))).toBe(true);
    await expect.poll(()=>lightbox.evaluate(img=>`${img.naturalWidth}x${img.naturalHeight}`)).toBe('1536x1024');
    await page.getByRole('button',{name:'Close full-screen image'}).click();
  }
});
