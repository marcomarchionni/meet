import React from 'react';
import { ReactWrapper, ShallowWrapper, mount, shallow } from 'enzyme';
import App from '../App';
import EventList from '../EventList';
import CitySearch from '../CitySearch';
import NumberOfEvents from '../NumberOfEvents';
import { act } from 'react-dom/test-utils';
import { setImmediate } from 'timers';
import { extractLocations } from '../api';
import { mockData } from '../mock-data';

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

describe('<App /> integration', () => {
  let AppWrapper: ReactWrapper<typeof App>;
  const expectedLocations = extractLocations(mockData);
  const userInput = 'Lon';
  const expectedLocation = 'London, UK';
  const expectedFilteredEvents = mockData.filter(
    (event) => event.location === expectedLocation,
  );
  const allEvents = mockData;

  beforeEach(async () => {
    await act(() => {
      AppWrapper = mount(<App />);
      return new Promise(setImmediate);
    });
    AppWrapper.update();
  });

  afterEach(() => AppWrapper.unmount());

  test('App passes mock events as prop to EventList', () => {
    const eventsProp = AppWrapper.find(EventList).props().events;
    expect(eventsProp).not.toEqual(undefined);
    expect(eventsProp).toHaveLength(2);
  });

  test('App passes mock locations as prop to CitySearch', () => {
    const locationsProp = AppWrapper.find(CitySearch).props().locations;
    expect(locationsProp).not.toEqual(undefined);
    expect(locationsProp).toEqual(expectedLocations);
  });

  test('List of events changes according to selected location', () => {
    // when: user input change on CitySearch textbox
    const locationInput = AppWrapper.find(CitySearch).find('.city');
    locationInput.simulate('change', {
      target: {
        value: userInput,
      },
    });
    AppWrapper.update();

    // then: CitySearch displays a list of locations matching the input
    const suggestions = AppWrapper.find(CitySearch).find('.suggestions li');
    expect(suggestions).toHaveLength(2);
    const chosenSuggestion = suggestions.at(0);
    expect(chosenSuggestion.text()).toBe(expectedLocation);

    // when: user clicks on a suggested location
    chosenSuggestion.simulate('click');
    AppWrapper.update();

    // then: EventList change the list of events accordingly
    const eventListWrapper = AppWrapper.find(EventList);
    expect(eventListWrapper.props().events).toEqual(expectedFilteredEvents);

    const eventListItems = eventListWrapper.find('.eventList li');
    expect(eventListItems).toHaveLength(expectedFilteredEvents.length);
  });

  test('Display all events if user selects All Cities', () => {
    const suggestions = AppWrapper.find(CitySearch).find('.suggestions li');
    expect(suggestions).toHaveLength(1);
    const allCitiesSuggestion = suggestions.at(0);

    // when: user clicks on All Cities
    allCitiesSuggestion.simulate('click');
    AppWrapper.update();

    // then: all events are displayed
    const eventListWrapper = AppWrapper.find(EventList);
    expect(eventListWrapper.props().events).toEqual(allEvents);

    const eventListItems = eventListWrapper.find('.eventList li');
    expect(eventListItems).toHaveLength(allEvents.length);
  });
});
