import { ShallowWrapper, shallow } from 'enzyme';
import App from '../App';
import CitySearch from '../CitySearch';
import EventList from '../EventList';
import NumberOfEvents from '../NumberOfEvents';

describe('<App /> component', () => {
  let AppWrapper: ShallowWrapper<typeof App>;
  beforeAll(() => {
    AppWrapper = shallow(<App />);
  });
  test('render list of events', () => {
    expect(AppWrapper.find(EventList)).toHaveLength(1);
  });

  test('render city search', () => {
    expect(AppWrapper.find(CitySearch)).toHaveLength(1);
  });

  test('render number of events', () => {
    expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
  });
});
