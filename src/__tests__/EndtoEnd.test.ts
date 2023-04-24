import puppeteer from 'puppeteer';
import { mockData } from '../mock-data';
import { onlyUnique } from '../utils';

describe('filter events by city', () => {
  let browser: puppeteer.Browser;
  let page: puppeteer.Page;
  let suggestions: puppeteer.ElementHandle<Element>[];

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.event');
  });
  afterAll(() => browser.close());
  test('When user hasn’t searched for a city, show upcoming events from all cities', async () => {
    const eventlocationElements = await page.$$('.event_location');
    expect(eventlocationElements).toHaveLength(mockData.length);
    const actualLocations = await Promise.all(
      eventlocationElements.map(async (element) => {
        const titleAndLocation = await (
          await element.getProperty('textContent')
        ).jsonValue();
        const location = titleAndLocation?.split('| ')[1];
        return location;
      }),
    );
    // actual events are set in different locations
    const actualUniqueLocations = actualLocations.filter(onlyUnique);
    expect(actualUniqueLocations.length).toBeGreaterThan(1);
  });

  test('User should see a list of suggestions when they search for a city', async () => {
    // when user types 'Berlin' in citySearch input
    await page.type('.city-search_input', 'Berlin');

    // then a list with suggestions is diplayed
    await page.waitForSelector('.city-search_suggestions');
    suggestions = await page.$$('.city-search_suggestions li');
    expect(suggestions).toBeDefined();
    expect(suggestions).toHaveLength(2);
  });

  test('User can select a city from the suggested list', async () => {
    // when user clicks on the suggestion 'Berlin, Germany'
    await page.click('.city-search_suggestions li:first-child');
    const inputText = await page.$eval('.city-search_input', (input) =>
      input.getAttribute('value'),
    );
    // then the user input is replaced by 'Berlin, Germany'
    expect(inputText).toBe('Berlin, Germany');

    // and the suggestion list disappears
    const suggestions = await page.$('.city-search-suggestions');
    expect(suggestions).toBeNull();

    // and the user should receive a list of upcoming events happening in Berlin
    const eventLocationElements = await page.$$('.event_location');
    const eventLocations = await Promise.all(
      eventLocationElements.map(async (element) => {
        const titleAndLocation = await (
          await element.getProperty('textContent')
        ).jsonValue();
        const location = titleAndLocation?.split('| ')[1];
        return location;
      }),
    );
    const uniqueLocations = eventLocations.filter(onlyUnique);
    expect(uniqueLocations).toHaveLength(1);
    expect(uniqueLocations[0]).toBe('Berlin, Germany');
  });
});

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
