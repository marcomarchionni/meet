import { Schema$Event } from './interfaces/google-interfaces';
import { mockData } from './mock-data';

/**
 * @param {*} events:
 * This function takes an event array and uses the map function to create
 * an array with unique locations, removing duplicates
 */
export const extractLocations = (
  events: Schema$Event[] | null | undefined,
): string[] => {
  const uniqueAndTruthy = (value: string, index: number, array: string[]) => {
    return value && array.indexOf(value) === index;
  };

  if (!events) return [];
  const locations = events
    .map((event) => event.location || '')
    .filter(uniqueAndTruthy);
  return locations;
};

export const getEvents = async () => {
  return mockData;
};
