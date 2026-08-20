import { test, expect } from '@playwright/test';

async function ready(page){
  await page.goto('/land.html');
  await page.waitForFunction(()=>document.documentElement.classList.contains('v2-ready'));
  await page.waitForSelector('#land-infographic-trigger');
}

test('Land and Food use Field Atlas infographics as primary visuals',async({page})=>{
  await ready(page);

  await expect(page.locator('.plan-desk')).toBeHidden();
  await expect(page.locator('.layers')).toBeHidden();
  const landImage=page.locator('#land-infographic-trigger img');
  await expect(landImage).toHaveAttribute('src','assets/visual-guides/blueprint-10-acre.svg');
  await expect.poll(()=>landImage.evaluate(img=>img.complete&&img.naturalWidth>0)).toBe(true);

  await page.getByRole('button',{name:'3 acres'}).click();
  await expect(landImage).toHaveAttribute('src','assets/visual-guides/blueprint-3-acre.svg');
  await page.getByRole('button',{name:'20 acres'}).click();
  await expect(landImage).toHaveAttribute('src','assets/visual-guides/blueprint-20-acre.svg');

  const trigger=page.locator('#land-infographic-trigger');
  await trigger.click();
  await expect(page.locator('#land-visual-lightbox')).toBeVisible();
  await expect.poll(()=>page.locator('#land-visual-lightbox-image').evaluate(img=>img.complete&&img.naturalWidth>0)).toBe(true);
  await page.getByRole('button',{name:'Zoom in'}).click();
  await expect(page.locator('#land-visual-zoom-level')).toHaveText('125%');
  await page.getByRole('button',{name:'Close full-screen image'}).click();
  await expect(trigger).toBeFocused();

  const foodImage=page.locator('#food-infographic-trigger img');
  await expect(foodImage).toHaveAttribute('src','assets/visual-guides/food-production-pathways.svg');
  await expect.poll(()=>foodImage.evaluate(img=>img.complete&&img.naturalWidth>0)).toBe(true);
  await expect(page.locator('.ribbon')).toBeHidden();
  await page.getByRole('tab',{name:'Household'}).click();
  await expect(page.locator('#food-name')).toHaveText('Household food system');
});

test('mobile Land infographic supports pinch zoom',async({page,context},testInfo)=>{
  test.skip(testInfo.project.name!=='mobile-chromium','Mobile gesture gate');
  await ready(page);
  await page.locator('#land-infographic-trigger').click();
  const image=page.locator('#land-visual-lightbox-image');
  await expect.poll(()=>image.evaluate(img=>img.complete&&img.naturalWidth>0)).toBe(true);
  const box=await page.locator('#land-visual-stage').boundingBox();
  expect(box).not.toBeNull();
  const cx=box.x+box.width/2,cy=box.y+box.height/2;
  const client=await context.newCDPSession(page);
  await client.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:cx-50,y:cy,id:0},{x:cx+50,y:cy,id:1}]});
  await client.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:cx-100,y:cy,id:0},{x:cx+100,y:cy,id:1}]});
  await client.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
  await expect.poll(async()=>Number((await page.locator('#land-visual-zoom-level').textContent()).replace('%',''))).toBeGreaterThan(150);
});
