const puppeteer = require('puppeteer');
var fs = require('fs');

module.exports = (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://www.hostelworld.com/hostels');

    const openAllAccordions = async () => {
        await page.$$eval('.accordion-navigation:not(.active)',
            nodes => nodes.forEach(node =>
                node.querySelector('a').click()
            )
        );
    }

    // ran twice because the first time the first one is closed
    await openAllAccordions();
    await openAllAccordions();

    const countries = await page.$$eval('[id^="hwta-country"]',
        nodes =>
            nodes.map(
                node => ({
                    name: node.innerText,
                    url: node.getAttribute('href')
                })
            )
    );

    // await page.screenshot({path: 'data-dump/get-countries.png', fullPage: true});

    // fs.writeFile('data-dump/countries.json', JSON.stringify(countries, null, 4), 'utf8', () => {});

    await browser.close();

    return countries;
});