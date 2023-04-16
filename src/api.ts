import { calendar_v3 } from 'googleapis';
import Schema$Event = calendar_v3.Schema$Event;

/**
 * @param {*} events:
 * This function takes an event array and uses the map function to create
 * an array with unique locations, removing duplicates
 */
export const extractLocations = (events: Schema$Event[]): string[] => {
  const uniqueAndTruthy = (value: string, index: number, array: string[]) => {
    return value && array.indexOf(value) === index;
  };

  if (!events) return [];
  const locations = events
    .map((event) => event.location || '')
    .filter(uniqueAndTruthy);
  return locations;
};
