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

async function resetAtlasEvidencePosition(page){
  await page.evaluate(()=>{
    const root=document.documentElement,prior=root.style.scrollBehavior;
    root.style.scrollBehavior='auto';
    window.scrollTo(0,0);
    document.querySelectorAll('.visual-rail').forEach(rail=>{rail.scrollLeft=0;});
    root.style.scrollBehavior=prior;
  });
  await expect.poll(()=>page.evaluate(()=>Math.round(window.scrollY))).toBe(0);
}

test('home is a focused navigation hub', async ({ page },testInfo) => {
  await ready(page,'/');
  await expect(page.getByRole('heading',{level:1})).toContainText('Design the land around the life');
  await expect(page.locator('.route-grid>a')).toHaveCount(5);
  await expect(page.locator('#fit')).toHaveCount(0);
  await expect(page.locator('#blueprint')).toHaveCount(0);
  await expect(page.getByRole('link',{name:'Explore regions',exact:true})).toHaveAttribute('href','regions.html');
  await expect(page.locator('.route-feature img')).toHaveAttribute('src','assets/visual-guides/blueprint-10-acre-landscape.png');
  await expectNoDocumentOverflow(page);
  await page.screenshot({path:`artifacts/${testInfo.project.name}-home.png`,fullPage:true});
});

test('legacy section links route to focused workspaces', async ({ page }) => {
  await page.goto('/#blueprint');
  await page.waitForURL(/land\.html#blueprint$/);
  await page.waitForFunction(() => document.documentElement.classList.contains('v2-ready'));
  await expect(page.locator('#blueprint')).toBeVisible();
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

test('land workspace exposes complete acreage art and production detail', async ({ page }) => {
  await ready(page,'/land.html');
  await page.getByRole('button',{name:'3 acres'}).click();
  await expect(page.locator('#plan-label')).toContainText('3-acre');
  await expect(page.locator('#land-infographic-trigger img')).toHaveAttribute('src','assets/visual-guides/blueprint-3-acre-landscape.png');
  await expect(page.getByRole('button',{name:'20 acres'})).toBeVisible();
  await page.getByRole('button',{name:'20 acres'}).click();
  await expect(page.locator('#land-infographic-trigger img')).toHaveAttribute('src','assets/visual-guides/blueprint-20-acre-landscape.png');
  await expect(page.locator('#food-infographic-trigger img')).toHaveAttribute('src','assets/visual-guides/food-production-pathways.png');
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

test('Field Atlas is curated, uncropped and every live plate opens', async ({ page },testInfo) => {
  await ready(page,'/visuals.html');
  await page.waitForSelector('#visual-atlas');
  await expect(page.getByRole('heading',{level:1})).toContainText('Reference plates');
  await expect(page.locator('.visual-group')).toHaveCount(5);
  for(const heading of ['Place','Land','Systems','Food','Seasons']) await expect(page.getByRole('heading',{name:heading,exact:true})).toBeVisible();

  const thumbs=page.locator('.visual-card img');await expect(thumbs).toHaveCount(9);
  const srcs=await thumbs.evaluateAll(imgs=>imgs.map(img=>img.getAttribute('src')));
  expect(srcs.every(src=>src?.endsWith('.svg'))).toBe(true);
  await expect(page.locator('[data-visual="acre20"]')).toHaveCount(1);
  await expect(page.locator('[data-visual="food"]')).toHaveCount(1);
  const imageStyle=await thumbs.first().evaluate(img=>({objectFit:getComputedStyle(img).objectFit,width:img.clientWidth,height:img.clientHeight,naturalWidth:img.naturalWidth,naturalHeight:img.naturalHeight}));
  expect(imageStyle.objectFit).not.toBe('cover');
  expect(Math.abs((imageStyle.width/imageStyle.height)-(imageStyle.naturalWidth/imageStyle.naturalHeight))).toBeLessThan(.03);

  const dialog=page.locator('#visual-lightbox'),image=page.locator('#visual-lightbox-image');
  const close=page.getByRole('button',{name:'Close full-screen image'});
  const cards=page.locator('.visual-card');
  for(let i=0;i<9;i++){
    const current=cards.nth(i);
    await current.click();
    await expect(dialog).toBeVisible();
    await expect.poll(async()=>image.evaluate(img=>img.complete&&img.naturalWidth>0)).toBe(true);
    await close.click();
    await expect(dialog).not.toBeVisible();
    await expect(current).toBeFocused();
  }

  const card=page.getByRole('button',{name:/Open Region comparison full screen/});await card.click();
  await expect(dialog).toBeVisible();await expect.poll(async()=>image.evaluate(img=>img.complete&&img.naturalWidth>0)).toBe(true);
  await expect(page.locator('#visual-zoom-level')).toHaveText('100%');
  await page.getByRole('button',{name:'Zoom in'}).click();await expect(page.locator('#visual-zoom-level')).toHaveText('125%');
  await page.keyboard.press('0');await expect(page.locator('#visual-zoom-level')).toHaveText('100%');
  await close.click();await expect(dialog).not.toBeVisible();await expect(card).toBeFocused();
  await expectNoDocumentOverflow(page);
  await resetAtlasEvidencePosition(page);
  await page.screenshot({path:`artifacts/${testInfo.project.name}-visuals.png`,fullPage:true});
});

test('mobile Field Atlas uses grouped horizontal rails without page overflow', async ({ page },testInfo) => {
  test.skip(testInfo.project.name!=='mobile-chromium','Mobile publication release gate');
  await ready(page,'/visuals.html');
  await page.waitForSelector('#visual-atlas');
  const rail=page.locator('#atlas-land .visual-rail');
  const metrics=await rail.evaluate(el=>({clientWidth:el.clientWidth,scrollWidth:el.scrollWidth,snap:getComputedStyle(el).scrollSnapType}));
  expect(metrics.scrollWidth).toBeGreaterThan(metrics.clientWidth);
  expect(metrics.snap).toContain('x');
  await expect.poll(()=>page.locator('[data-visual="acre10"] img').evaluate(img=>img.currentSrc.endsWith('assets/visual-guides/blueprint-10-acre-portrait.png'))).toBe(true);
  await expectNoDocumentOverflow(page);
});

test('mobile visual atlas pinch, pan and double-tap work directly', async ({ page, context },testInfo) => {
  test.skip(testInfo.project.name!=='mobile-chromium','Touch gesture release gate');
  await ready(page,'/visuals.html');
  await page.waitForSelector('#visual-atlas');
  await page.getByRole('button',{name:/Open Region comparison full screen/}).click();
  const image=page.locator('#visual-lightbox-image');await expect.poll(async()=>image.evaluate(img=>img.complete&&img.naturalWidth>0)).toBe(true);
  const box=await page.locator('#visual-stage').boundingBox();expect(box).not.toBeNull();
  const cx=box.x+box.width/2,cy=box.y+box.height/2;
  const client=await context.newCDPSession(page);

  await client.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:cx-55,y:cy,id:0},{x:cx+55,y:cy,id:1}]});
  await client.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:cx-105,y:cy,id:0},{x:cx+105,y:cy,id:1}]});
  await client.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
  await expect.poll(async()=>Number((await page.locator('#visual-zoom-level').textContent()).replace('%',''))).toBeGreaterThan(150);

  const beforePan=await image.evaluate(img=>getComputedStyle(img).transform);
  await client.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:cx,y:cy,id:2}]});
  await client.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:cx+48,y:cy+32,id:2}]});
  await client.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
  await expect.poll(async()=>image.evaluate(img=>getComputedStyle(img).transform)).not.toBe(beforePan);

  for(let i=0;i<2;i++){
    await client.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:cx,y:cy,id:3+i}]});
    await client.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
  }
  await expect.poll(async()=>Number((await page.locator('#visual-zoom-level').textContent()).replace('%',''))).toBe(100);
});
