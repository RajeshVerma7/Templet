const puppeteer = require('puppeteer');

console.log(puppeteer);
var scrap = async (url) => {
    if (url && typeof url === 'string' && url.length){
        
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        var scrapedContent = '';
        page.on('response', async resp => {
            if (resp._url == url) {
                scrapedContent = resp.text();
            }
        });

        await page.goto(url);

        await browser.close();
        return await scrapedContent;
    }
};

module.exports = {
    scrap: scrap
}