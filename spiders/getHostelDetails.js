const puppeteer = require('puppeteer');
var fs = require('fs');

module.exports = (async (hostelUrl, city, country) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(`${hostelUrl}?dateFrom=2019-06-01&dateTo=2019-06-02&number_of_guests=1&sc_pos=1`);

    const rooms = await page.$$eval('.room-tr',
        nodes =>
            nodes.map(
                node => ({
                    sleeps: [...node.querySelectorAll('.text-dark-gray.text-small')] // IMPROVE SELECTOR
                        .filter(n => n.innerText.includes('Sleeps'))
                        .map(n => parseInt(n.innerText.replace(/[^0-9]/g, ''))),
                    price: [...node.querySelectorAll('.rate-type-price')] // IMPROVE SELECTOR
                        .map(n => parseInt(n.innerText.replace(/[^0-9]/g, ''))),
                })
            )
    );

    console.log(JSON.stringify(rooms, null, 2));

    // fs.writeFile('data-dump/hostel-details.json', JSON.stringify(rooms, null, 4), 'utf8', () => {});

    await browser.close();

    return rooms;
})();