import React, { useEffect, useState } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { calendar_v3 } from 'googleapis';
import Schema$Event = calendar_v3.Schema$Event;
import { extractLocations, getEvents } from './api';

function App() {
  const [events, setEvents] = useState<Schema$Event[]>([]);
  const [locations, setLocations] = useState<string[]>([]);

  useEffect(() => {
    getEvents().then((events) => {
      setEvents(events);
      setLocations(extractLocations(events));
    });
  }, []);

  const updateEvents = (location: string) => {
    const locationEvents =
      location === 'all'
        ? events
        : events.filter((event) => event.location === location);
    setEvents(locationEvents);
  };

  return (
    <div className="App">
      <CitySearch locations={locations} updateEvents={updateEvents} />
      <NumberOfEvents />
      <EventList events={events} />
    </div>
  );
}

export default App;
