import puppeteer from 'puppeteer';

describe('show/hide event details', () => {
  let browser: puppeteer.Browser;
  let page: puppeteer.Page;
  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.event');
  });
  afterAll(() => {
    browser.close();
  });
  test('An event element is collapsed by default', async () => {
    const description = await page.$('.event_description');
    expect(description).toBeNull();
  });

  test('User can expand an event to see its details', async () => {
    await page.click('.event_details-button');
    const description = await page.$('.event_description');
    expect(description).toBeDefined();
  });

  test('User can collapse an event to hide its details', async () => {
    await page.click('.event_details-button');
    const description = await page.$('.event_description');
    expect(description).toBeNull();
  }, 30000);
});
