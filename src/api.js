/**
 * @param {*} events:
 * This function takes an event array and uses the map function to create
 * an array with unique locations, removing duplicates
 */
export const extractLocations = (events) => {
  const allLocations = events.map((event) => event.location);
  const uniqueLocations = [...new Set(allLocations)];
  return uniqueLocations;
};
