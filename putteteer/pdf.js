const puppeteer = require('puppeteer');


(async () => {
  const browser = await puppeteer.launch({
    // headless: false,调试
  });
  const page = await browser.newPage();
  await page.goto('https://jelly.jd.com/article/604a15ce9c61f9014c2195ed', {
    waitUntil: 'networkidle2',
  });
  await page.pdf({ path: 'hn.pdf', format: 'a4' });

  await browser.close();
})()