'use strict';

// const getCountries = require('./spiders/getCountries');
// const getCities = require('./spiders/getCities');
const puppeteer = require('puppeteer');

module.exports.hello = async (event, context) => {

  await new Promise(r => setTimeout(r, 1000));

  return {
    message: `Go ${event} v1.0! Your function executed successfully!`,
    input: event
  };
};

module.exports.countries = async (event) => {

  const browser = await puppeteer.launch({
    headless: true,
    executablePath: '/opt/headless_shell',
    args: ['--no-sandbox', '--disable-gpu', '--single-process'],
  });

  const page = await browser.newPage();
  await page.goto('https://google.com'/*event['queryStringParameters'].address*/, {
    // waitUntil: ['domcontentloaded', 'networkidle0'],
  });

  // await page.waitFor(1000);

  // const countries = await getCountries();

  return {
    message: `Got ${0} countries`,
    // data: countries
  };

}


