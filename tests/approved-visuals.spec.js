import { test, expect } from '@playwright/test';

const approved={
  acre3:'assets/visual-guides/blueprint-3-acre-landscape.png',
  acre10:'assets/visual-guides/blueprint-10-acre-landscape.png',
  acre20:'assets/visual-guides/blueprint-20-acre-landscape.png',
  food:'assets/visual-guides/food-production-pathways.png',
  region:'assets/visual-guides/region-comparison.png',
  spectrum:'assets/visual-guides/independence-spectrum.png',
  systems:'assets/visual-guides/homestead-systems.png',
  yearOn:'assets/visual-guides/homestead-year-southwest-ontario.png',
  yearBc:'assets/visual-guides/homestead-year-coastal-bc.png'
};
const portraits={
  acre3:'assets/visual-guides/blueprint-3-acre-portrait.png',
  acre10:'assets/visual-guides/blueprint-10-acre-portrait.png',
  acre20:'assets/visual-guides/blueprint-20-acre-portrait.png'
};

test('approved Field Atlas masters are the rendered artwork', async ({ page }) => {
  await page.goto('/visuals.html');
  await page.waitForFunction(() => document.documentElement.classList.contains('v2-ready'));
  await page.waitForSelector('#visual-atlas');
  const isPortrait=(await page.viewportSize()).width<=720;

  for(const [id,landscape] of Object.entries(approved)){
    const expected=isPortrait&&portraits[id]?portraits[id]:landscape;
    const card=page.locator(`[data-visual="${id}"]`);
    const thumb=card.locator('img');
    await expect(card).toHaveCount(1);
    await expect(thumb).toHaveAttribute('src',/\.svg$/);
    await expect(thumb).toHaveAttribute('srcset',`${landscape} 1x`);
    if(portraits[id]) await expect(card.locator('source[data-demeter-portrait]')).toHaveAttribute('srcset',portraits[id]);
    await expect.poll(()=>thumb.evaluate((img,source)=>img.currentSrc.endsWith(source),expected)).toBe(true);
    await expect.poll(()=>thumb.evaluate(img=>img.naturalWidth>0&&img.naturalHeight>0)).toBe(true);

    await card.click();
    const lightbox=page.locator('#visual-lightbox-image');
    await expect.poll(()=>lightbox.evaluate((img,source)=>img.currentSrc.endsWith(source),expected)).toBe(true);
    await expect.poll(()=>lightbox.evaluate(img=>img.naturalWidth>0&&img.naturalHeight>0)).toBe(true);
    await page.getByRole('button',{name:'Close full-screen image'}).click();
  }

  await expect(page.locator('.visual-group')).toHaveCount(5);
  await expect(page.locator('[data-visual="acre20"]')).toHaveCount(1);
  await expect(page.locator('[data-visual="food"]')).toHaveCount(1);
  await expect(page.locator('#atlas-food')).toHaveCount(1);
});
