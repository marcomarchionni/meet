import { useEffect, useState } from 'react';
import './App.css';
import CitySearch from './CitySearch';
import EventList from './EventList';
import NumberOfEvents from './NumberOfEvents';
import { extractLocations, getEvents } from './api';
import { Schema$Event } from './interfaces/google-interfaces';

function App() {
  const [events, setEvents] = useState<Schema$Event[]>([]);
  const [locations, setLocations] = useState<string[]>([]);

  useEffect(() => {
    getEvents().then((events) => {
      setEvents(events);
      setLocations(extractLocations(events));
    });
  }, []);
  return (
    <div className="App">
      <CitySearch locations={locations} />
      <NumberOfEvents />
      <EventList events={events} />
    </div>
  );
}

export default App;
