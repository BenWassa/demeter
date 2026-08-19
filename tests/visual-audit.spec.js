import { test, expect } from '@playwright/test';

test('visual audit compares legacy/current, supports undo and exports JSON', async ({ page },testInfo) => {
  await page.addInitScript(()=>localStorage.removeItem('demeter.visual-audit.v1'));
  await page.goto('/visual-audit.html');
  await expect(page.getByRole('heading',{level:1})).toContainText('Choose what Demeter should actually keep');
  await page.waitForFunction(()=>document.documentElement.classList.contains('audit-ready'),null,{timeout:15000});
  const items=page.locator('.audit-item');
  await expect(items).toHaveCount(9);

  const activate=async locator=>{
    if(testInfo.project.name!=='mobile-chromium'){
      await locator.click();
      return;
    }
    await locator.evaluate(el=>el.scrollIntoView({block:'center',inline:'center'}));
    const box=await locator.boundingBox();expect(box).not.toBeNull();
    const x=box.x+box.width/2,y=box.y+box.height/2;
    const targetText=(await locator.textContent()).trim();
    const hitText=await page.evaluate(({x,y})=>document.elementFromPoint(x,y)?.closest('button')?.textContent?.trim()||'',{x,y});
    expect(hitText).toBe(targetText);
    await page.touchscreen.tap(x,y);
  };

  const first=items.first();
  const legacySelect=first.locator('[data-select="legacy"]');
  await expect(legacySelect).toBeEnabled();
  await expect(first.locator('.audit-variant img')).toHaveCount(2);
  await expect.poll(async()=>first.locator('.audit-variant img').evaluateAll(imgs=>imgs.every(img=>img.complete&&img.naturalWidth>0))).toBe(true);
  await expect(page.locator('[data-item="acre10"] .audit-variant')).toHaveCount(5);

  await activate(legacySelect);
  await activate(first.locator('[data-outcome="keep"]'));
  let json=JSON.parse(await page.locator('#audit-json').inputValue());
  expect(json.reviews.region.preferredVariant).toBe('legacy');
  expect(json.reviews.region.outcome).toBe('keep');

  await activate(first.locator('[data-select="current"]'));
  json=JSON.parse(await page.locator('#audit-json').inputValue());
  expect(json.reviews.region.preferredVariant).toBe('current');
  await activate(page.getByRole('button',{name:'Undo'}));
  json=JSON.parse(await page.locator('#audit-json').inputValue());
  expect(json.reviews.region.preferredVariant).toBe('legacy');

  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
  await page.evaluate(()=>{window.scrollTo(0,0);document.querySelectorAll('.audit-variants').forEach(el=>el.scrollLeft=0);});
  await page.screenshot({path:`artifacts/${testInfo.project.name}-visual-audit.png`,fullPage:true});
});
