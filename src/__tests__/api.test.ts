import { calendar_v3 } from 'googleapis';
import { extractLocations } from '../api';
import { mockData } from '../mock-data';

describe('extractLocations test', () => {
  test('Returns empty array if no event is passed', () => {
    const events: calendar_v3.Schema$Event[] = [];
    const locations = extractLocations(events);
    expect(locations).toHaveLength(0);
  });

  test('Return locations array from events', () => {
    const events = mockData;
    const locations = extractLocations(events);
    expect(locations).toContain('London, UK');
    expect(locations).toContain('Berlin, Germany');
  });
});
