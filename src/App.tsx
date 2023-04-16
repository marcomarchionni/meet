import './App.css';
import CitySearch from './CitySearch';
import EventList from './EventList';
import NumberOfEvents from './NumberOfEvents';

function App() {
  return (
    <div className="App">
      <CitySearch locations={[]} />
      <NumberOfEvents />
      <EventList events={[]} />
    </div>
  );
}

export default App;
