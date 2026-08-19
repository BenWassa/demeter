import { test, expect } from '@playwright/test';

async function ready(page,path='/') {
  await page.goto(path);
  await page.waitForFunction(() => document.documentElement.classList.contains('v2-ready'));
}

async function overflowReport(page) {
  return page.evaluate(() => {
    const viewport=document.documentElement.clientWidth,total=document.documentElement.scrollWidth;
    const offenders=[...document.querySelectorAll('body *')].map(el=>{const r=el.getBoundingClientRect();return{tag:el.tagName.toLowerCase(),id:el.id||'',cls:typeof el.className==='string'?el.className.slice(0,100):'',left:Math.round(r.left),right:Math.round(r.right),width:Math.round(r.width),scrollWidth:el.scrollWidth};}).filter(x=>x.left<-1||x.right>viewport+1).slice(0,20);
    return{viewport,total,overflow:total-viewport,offenders};
  });
}

async function expectNoDocumentOverflow(page){const report=await overflowReport(page);if(report.overflow>1)console.log('OVERFLOW_DIAGNOSTIC',JSON.stringify(report));expect(report.overflow).toBeLessThanOrEqual(1);}

test('home is a focused navigation hub', async ({ page },testInfo) => {
  await ready(page,'/');
  await expect(page.getByRole('heading',{level:1})).toContainText('Design the land around the life');
  await expect(page.locator('.route-grid>a')).toHaveCount(5);
  await expect(page.locator('#fit')).toHaveCount(0);
  await expect(page.locator('#blueprint')).toHaveCount(0);
  await expect(page.getByRole('link',{name:/Explore regions/})).toHaveAttribute('href','regions.html');
  await expectNoDocumentOverflow(page);
  await page.screenshot({path:`artifacts/${testInfo.project.name}-home.png`,fullPage:true});
});

test('regions workspace tunes fit and switches evidence', async ({ page }) => {
  await ready(page,'/regions.html');
  await page.getByRole('button',{name:'Fully remote'}).click();
  await expect(page.locator('#fit-title')).toBeVisible();
  await page.getByRole('tab',{name:/Fraser Valley/}).click();
  await expect(page.locator('#region-name')).toHaveText('Fraser Valley');
  await expect(page.locator('#region-sources a')).toHaveCount(4);
  await expect(page.locator('#blueprint')).toHaveCount(0);
  await expectNoDocumentOverflow(page);
});

test('systems workspace remains interactive', async ({ page }) => {
  await ready(page,'/systems.html');
  await page.getByRole('tab',{name:'Power'}).click();
  await expect(page.locator('#sys-title')).toBeVisible();
  await expect(page.locator('#blueprint')).toHaveCount(0);
  await expectNoDocumentOverflow(page);
});

test('land workspace switches acreage and production depth', async ({ page }) => {
  await ready(page,'/land.html');
  await page.getByRole('button',{name:'3 acres'}).click();
  await expect(page.locator('#plan-label')).toContainText('3-acre');
  const plan3=await page.locator('#plan-title').textContent();
  await page.getByRole('button',{name:'20 acres'}).click();
  await expect(page.locator('#plan-label')).toContainText('20-acre');
  expect(await page.locator('#plan-title').textContent()).not.toBe(plan3);
  await page.getByRole('tab',{name:'Household'}).click();
  await expect(page.locator('#food-name')).toHaveText('Household food system');
  await expectNoDocumentOverflow(page);
});

test('plan workspace compares acquisition routes', async ({ page }) => {
  await ready(page,'/plan.html');
  await page.getByRole('tab',{name:/Raw land/}).click();
  await expect(page.locator('#arch-name')).toHaveText('Raw land + designed build');
  await expect(page.locator('#roadmap')).toBeVisible();
  await expectNoDocumentOverflow(page);
});

test('tabs support keyboard navigation', async ({ page }) => {
  await ready(page,'/regions.html');
  const first=page.getByRole('tab',{name:/Southwest Ontario/});
  await first.focus();await page.keyboard.press('ArrowRight');
  const second=page.getByRole('tab',{name:/Fraser Valley/});
  await expect(second).toBeFocused();await expect(second).toHaveAttribute('aria-selected','true');
});

test('visual atlas loads real assets and accessible zoom controls work', async ({ page },testInfo) => {
  await ready(page,'/visuals.html');
  await page.waitForSelector('#visual-atlas');
  const thumbs=page.locator('.visual-card img');await expect(thumbs).toHaveCount(9);
  const srcs=await thumbs.evaluateAll(imgs=>imgs.map(img=>img.getAttribute('src')));
  const decoded=await page.evaluate(async paths=>Promise.all(paths.map(src=>new Promise(resolve=>{const img=new Image();img.onload=()=>resolve({src,ok:img.naturalWidth>0});img.onerror=()=>resolve({src,ok:false});img.src=src;}))),srcs);
  expect(decoded.filter(asset=>!asset.ok),JSON.stringify(decoded,null,2)).toEqual([]);
  const card=page.getByRole('button',{name:/Open Region comparison full screen/});await card.click();
  const dialog=page.locator('#visual-lightbox'),image=page.locator('#visual-lightbox-image');
  await expect(dialog).toBeVisible();await expect.poll(async()=>image.evaluate(img=>img.complete&&img.naturalWidth>0)).toBe(true);
  await expect(page.locator('#visual-zoom-level')).toHaveText('100%');
  await page.getByRole('button',{name:'Zoom in'}).click();await expect(page.locator('#visual-zoom-level')).toHaveText('125%');
  await page.keyboard.press('0');await expect(page.locator('#visual-zoom-level')).toHaveText('100%');
  await page.getByRole('button',{name:'Close full-screen image'}).click();await expect(dialog).not.toBeVisible();await expect(card).toBeFocused();
  await expectNoDocumentOverflow(page);
  await page.screenshot({path:`artifacts/${testInfo.project.name}-visuals.png`,fullPage:true});
});
