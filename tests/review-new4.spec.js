import { test, expect } from '@playwright/test';

test('capture four newly uploaded infographic assets',async({page},testInfo)=>{
  test.skip(testInfo.project.name!=='desktop-chromium','Review evidence only');
  await page.goto('/review-new4.html');
  const images=page.locator('.item img');
  await expect(images).toHaveCount(4);
  for(let i=0;i<4;i++) await expect.poll(()=>images.nth(i).evaluate(img=>img.complete&&img.naturalWidth>0)).toBe(true);
  await page.screenshot({path:'artifacts/review-new4-grid.png',fullPage:true});
});
