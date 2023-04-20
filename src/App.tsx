import { useEffect, useState } from 'react';
import './App.css';
import CitySearch from './CitySearch';
import EventList from './EventList';
import NumberOfEvents from './NumberOfEvents';
import { extractLocations, getEvents } from './api';
import { Schema$Event } from './interfaces/google-interfaces';
import './nprogress.css';

function App() {
  const [events, setEvents] = useState<Schema$Event[]>([]);
  const [locations, setLocations] = useState<string[]>([]);

  useEffect(() => {
    updateEvents();
  }, []);

  const updateEvents = (location: string = '') => {
    getEvents().then((events) => {
      setLocations(extractLocations(events));
      const locationEvents =
        location === ''
          ? events
          : events.filter((event) => event.location === location);
      setEvents(locationEvents);
    });
  };

  return (
    <div className="app">
      <CitySearch locations={locations} updateEvents={updateEvents} />
      <NumberOfEvents />
      <EventList events={events} />
    </div>
  );
}

export default App;
