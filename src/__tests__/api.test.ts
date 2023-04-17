import { extractLocations } from '../api';

describe('extractLocations test', () => {
  test('Returns empty array if null events paramenter is passed', () => {
    const locations = extractLocations(null);
    expect(locations).toHaveLength(0);
  });
});
