const puppeteer = require('puppeteer');
const fs = require('fs')
const {promisify} = require('util');

const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);
const {ready} = require('./server');

(async () => {
  let server;
  try {
    server = await ready;
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();

    const html = await readFile('./public/index.html');
    await page.setContent(html.toString(), {waitUntil: 'domcontentloaded'});
    // await page.goto('http://localhost:3000/index.html', {waitUntil: 'domcontentloaded'});
    await page.waitFor(1000);
    // await page.waitForSelector('.components-Sheet-Sheet__sheet__n8sxE', body => body.textContent)
    await page.screenshot({path: './result.png'});

     await page.pdf({
      format: 'A4',
      printBackground: true,
      path: './result.pdf'
    });
    
    await browser.close();
  } catch(e) {
    console.error(e)
  } finally {
    server.close()
  }
})();
