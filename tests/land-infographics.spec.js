import { test, expect } from '@playwright/test';

async function ready(page){
  await page.goto('/land.html');
  await page.waitForFunction(()=>document.documentElement.classList.contains('v2-ready'));
  await page.waitForSelector('#land-infographic-trigger');
}

const landscape={
  '3':'assets/visual-guides/blueprint-3-acre-landscape.png',
  '10':'assets/visual-guides/blueprint-10-acre-landscape.png',
  '20':'assets/visual-guides/blueprint-20-acre-landscape.png'
};
const portrait={
  '3':'assets/visual-guides/blueprint-3-acre-portrait.png',
  '10':'assets/visual-guides/blueprint-10-acre-portrait.png',
  '20':'assets/visual-guides/blueprint-20-acre-portrait.png'
};

test('Land uses all approved acreage and Food infographic masters',async({page},testInfo)=>{
  await ready(page);

  await expect(page.locator('.plan-desk')).toBeHidden();
  await expect(page.locator('.layers')).toBeHidden();
  const isPortrait=(await page.viewportSize()).width<=720;
  const landImage=page.locator('#land-infographic-trigger img');
  await expect(landImage).toHaveAttribute('src',landscape['10']);
  await expect.poll(()=>landImage.evaluate((img,source)=>img.currentSrc.endsWith(source),isPortrait?portrait['10']:landscape['10'])).toBe(true);

  for(const acreage of ['3','10','20']){
    await page.getByRole('button',{name:`${acreage} acres`}).click();
    await expect(landImage).toHaveAttribute('src',landscape[acreage]);
    await expect.poll(()=>landImage.evaluate((img,source)=>img.currentSrc.endsWith(source),isPortrait?portrait[acreage]:landscape[acreage])).toBe(true);
    await expect.poll(()=>landImage.evaluate(img=>img.complete&&img.naturalWidth>0)).toBe(true);
  }

  const trigger=page.locator('#land-infographic-trigger');
  await trigger.click();
  await expect(page.locator('#land-visual-lightbox')).toBeVisible();
  await expect.poll(()=>page.locator('#land-visual-lightbox-image').evaluate(img=>img.complete&&img.naturalWidth>0)).toBe(true);
  await page.getByRole('button',{name:'Zoom in'}).click();
  await expect(page.locator('#land-visual-zoom-level')).toHaveText('125%');
  await page.getByRole('button',{name:'Close full-screen image'}).click();
  await expect(trigger).toBeFocused();

  const foodTrigger=page.locator('#food-infographic-trigger');
  await expect(foodTrigger).toHaveCount(1);
  const foodImage=foodTrigger.locator('img');
  await expect(foodImage).toHaveAttribute('src','assets/visual-guides/food-production-pathways.png');
  await expect.poll(()=>foodImage.evaluate(img=>img.complete&&img.naturalWidth>0)).toBe(true);
  await page.getByRole('tab',{name:'Household'}).click();
  await expect(page.locator('#food-name')).toHaveText('Household food system');
  await page.screenshot({path:`artifacts/${testInfo.project.name}-land-infographics.png`,fullPage:true});
});

test('mobile Land uses portrait blueprint and supports pinch zoom',async({page,context},testInfo)=>{
  test.skip(testInfo.project.name!=='mobile-chromium','Mobile gesture gate');
  await ready(page);
  const preview=page.locator('#land-infographic-trigger img');
  await expect.poll(()=>preview.evaluate(img=>img.currentSrc.endsWith('assets/visual-guides/blueprint-10-acre-portrait.png'))).toBe(true);
  await page.locator('#land-infographic-trigger').click();
  const image=page.locator('#land-visual-lightbox-image');
  await expect.poll(()=>image.evaluate(img=>img.complete&&img.naturalWidth>0)).toBe(true);
  await expect.poll(()=>image.evaluate(img=>img.currentSrc.endsWith('assets/visual-guides/blueprint-10-acre-portrait.png'))).toBe(true);
  const box=await page.locator('#land-visual-stage').boundingBox();
  expect(box).not.toBeNull();
  const cx=box.x+box.width/2,cy=box.y+box.height/2;
  const client=await context.newCDPSession(page);
  await client.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:cx-50,y:cy,id:0},{x:cx+50,y:cy,id:1}]});
  await client.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:cx-100,y:cy,id:0},{x:cx+100,y:cy,id:1}]});
  await client.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
  await expect.poll(async()=>Number((await page.locator('#land-visual-zoom-level').textContent()).replace('%',''))).toBeGreaterThan(150);
});
