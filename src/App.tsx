import { useEffect, useState } from 'react';
import './App.css';
import CitySearch from './CitySearch';
import EventList from './EventList';
import NumberOfEvents from './NumberOfEvents';
import { extractLocations, getEvents } from './api';
import { Schema$Event } from './interfaces/google-interfaces';
import './nprogress.css';
import { defaultLocation, defaultNumberOfEvents } from './defaults';

function App() {
  const [events, setEvents] = useState<Schema$Event[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [numberOfEvents, setNumberOfEvents] = useState<number>(
    defaultNumberOfEvents,
  );
  const [location, setLocation] = useState<string>(defaultLocation);

  useEffect(() => {
    updateEvents(location, numberOfEvents);
  }, [location, numberOfEvents]);

  const updateEvents = (location: string, numberOfEvents: number) => {
    getEvents().then((events) => {
      setLocations(extractLocations(events));
      const locationEvents =
        location === ''
          ? events
          : events.filter((event) => event.location === location);
      if (locationEvents.length > numberOfEvents) {
        setEvents(locationEvents.slice(0, numberOfEvents));
      } else {
        setEvents(locationEvents);
      }
    });
  };

  return (
    <div className="app">
      <CitySearch
        locations={locations}
        location={location}
        setLocation={setLocation}
      />
      <NumberOfEvents
        numberOfEvents={numberOfEvents}
        setNumberOfEvents={setNumberOfEvents}
      />
      <EventList events={events} />
    </div>
  );
}

export default App;
