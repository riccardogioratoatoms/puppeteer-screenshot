const chrome = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');

async function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

async function getScreenshot(url, type, quality, fullPage, viewportWidth, viewportHeight) {
    const browser = await puppeteer.launch({
        args: chrome.args,
        executablePath: await chrome.executablePath,
        headless: chrome.headless,
        defaultViewport: {
            width: viewportWidth,
            height: viewportHeight,
            deviceScaleFactor: 2
        }
    });

    const page = await browser.newPage();
    await page.goto(url);
    await timeout(7500);
    const file = await page.screenshot({ type,  quality, fullPage });
    await browser.close();
    return file;
}

module.exports = { getScreenshot };