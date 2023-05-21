import { useEffect, useState } from 'react';
import { WarnAlert } from './Alert';
import './App.css';
import CitySearch from './CitySearch';
import EventList from './EventList';
import NumberOfEvents from './NumberOfEvents';
import WelcomeScreen from './WelcomeScreen';
import { extractLocations, getEvents } from './api';
import { defaultLocation, defaultNumberOfEvents } from './defaults';
import { NoAuthCodeError } from './errors';
import { Schema$Event } from './interfaces/google-interfaces';
import logo from './meet-logo.png';
import './nprogress.css';
import CityScatterChart from './CityScatterChart';
import GenrePieChart from './GenrePieChart';

function App() {
  const [events, setEvents] = useState<Schema$Event[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [numberOfEvents, setNumberOfEvents] = useState<number>(
    defaultNumberOfEvents,
  );
  const [location, setLocation] = useState<string>(defaultLocation);
  const [warning, setWarning] = useState('');
  const [showWelcomeScreen, setShowWelcomeScreen] = useState<
    boolean | undefined
  >(undefined);

  useEffect(() => {
    notifyIfOffline();
    updateEventsAndLocations(location, numberOfEvents);
  }, [location, numberOfEvents]);

  const notifyIfOffline = () => {
    if (!navigator.onLine) {
      setWarning('The App is offline. Displayed data may not be up to date.');
    } else {
      setWarning('');
    }
  };

  const updateEventsAndLocations = (
    location: string,
    numberOfEvents: number,
  ) => {
    getEvents()
      .then((events) => {
        setLocations(extractLocations(events));
        const locationEvents =
          location === ''
            ? events
            : events.filter((event) => event.location === location);

        setEvents(locationEvents.slice(0, numberOfEvents));
        setShowWelcomeScreen(false);
      })
      .catch((error) => {
        if (error instanceof NoAuthCodeError) {
          setShowWelcomeScreen(true);
        }
      });
  };

  if (showWelcomeScreen === undefined) {
    return <div className="app"></div>;
  }

  return (
    <div className="app">
      <WarnAlert text={warning} />
      <header className="header">
        <div className="header_logo">
          <img src={logo} width="200" alt="meet"></img>
        </div>
        <div className="header_menu">
          <CitySearch
            locations={locations}
            location={location}
            setLocation={setLocation}
          />
          <NumberOfEvents setNumberOfEvents={setNumberOfEvents} />
        </div>
      </header>
      <main>
        <div className="data-vis-wrapper">
          <GenrePieChart events={events} />
          <CityScatterChart
            events={events}
            locations={location ? [location] : locations}
          />
        </div>
        <EventList events={events} />
      </main>
      {showWelcomeScreen && <WelcomeScreen />}
    </div>
  );
}

export default App;
