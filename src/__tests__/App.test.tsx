import { ReactWrapper, mount } from 'enzyme';
import App from '../App';
import CitySearch from '../CitySearch';
import EventList from '../EventList';
import NumberOfEvents from '../NumberOfEvents';
import { extractLocations } from '../api';
import { mockData } from '../mock-data';
import { act } from 'react-dom/test-utils';
import { setImmediate } from 'timers';
import { defaultNumberOfEvents } from '../defaults';

describe('<App /> component', () => {
  let AppWrapper: ReactWrapper<typeof App>;
  const { ResizeObserver } = window;

  beforeAll(async () => {
    // Mock resize observer https://github.com/maslianok/react-resize-detector#testing-with-enzyme-and-jest
    //@ts-ignore
    delete window.ResizeObserver;
    window.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));

    await act(() => {
      AppWrapper = mount(<App />);
      return new Promise(setImmediate);
    });
    AppWrapper.update();
  });

  afterAll(() => {
    window.ResizeObserver = ResizeObserver;
    jest.restoreAllMocks();
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

describe('<App /> integration: passing props to children', () => {
  let AppWrapper: ReactWrapper<typeof App>;
  const expectedLocations = extractLocations(mockData);
  const expectedEvents = mockData.slice(0, defaultNumberOfEvents);
  const { ResizeObserver } = window;

  beforeEach(async () => {
    // Mock resize observer https://github.com/maslianok/react-resize-detector#testing-with-enzyme-and-jest
    //@ts-ignore
    delete window.ResizeObserver;
    window.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));

    await act(() => {
      AppWrapper = mount(<App />);
      return new Promise(setImmediate);
    });
    AppWrapper.update();
  });

  afterEach(() => {
    window.ResizeObserver = ResizeObserver;
    jest.restoreAllMocks();

    AppWrapper.unmount();
  });

  test('App passes mock events as prop to EventList', () => {
    const eventsProp = AppWrapper.find(EventList).props().events;
    expect(eventsProp).not.toEqual(undefined);
    expect(eventsProp).toHaveLength(expectedEvents.length);
  });

  test('App passes mock locations as prop to CitySearch', () => {
    const locationsProp = AppWrapper.find(CitySearch).props().locations;
    expect(locationsProp).not.toEqual(undefined);
    expect(locationsProp).toEqual(expectedLocations);
  });
});

describe('<App /> integration: selecting locations in sugguestions list', () => {
  let AppWrapper: ReactWrapper<typeof App>;
  const userInput = 'Be';
  const expectedLocation = 'Berlin, Germany';
  const expectedFilteredEvents = mockData.filter(
    (event) => event.location === expectedLocation,
  );
  const allEvents = mockData.slice(0, defaultNumberOfEvents);
  const { ResizeObserver } = window;

  beforeEach(async () => {
    // Mock ResizeObserver https://github.com/maslianok/react-resize-detector#testing-with-enzyme-and-jest
    //@ts-ignore
    delete window.ResizeObserver;
    window.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));

    /* Trigger a list of suggestions */
    // Init application and first API call
    await act(() => {
      AppWrapper = mount(<App />);
      return new Promise(setImmediate);
    });
    AppWrapper.update();

    // User inserts text on CitySearch input
    const citySearchInput =
      AppWrapper.find(CitySearch).find('.city-search_input');
    await act(() => {
      citySearchInput.simulate('focus');
      citySearchInput.simulate('change', {
        target: {
          value: userInput,
        },
      });
      return new Promise(setImmediate);
    });
    AppWrapper.update();

    const suggestions = AppWrapper.find(CitySearch).find(
      '.city-search_suggestions li',
    );
    expect(suggestions).toHaveLength(2);
  });

  afterEach(() => {
    window.ResizeObserver = ResizeObserver;
    jest.restoreAllMocks();

    AppWrapper.unmount();
  });

  test('List of events changes according to selected location', async () => {
    // Given: SuggestionsList displays a list of locations
    const suggestions = AppWrapper.find(CitySearch).find(
      '.city-search_suggestions li',
    );
    expect(suggestions).toHaveLength(2);

    // when: user clicks on a suggested location
    const chosenSuggestion = suggestions.at(0);
    expect(chosenSuggestion.text()).toBe(expectedLocation);
    await act(() => {
      chosenSuggestion.simulate('click');
      return new Promise(setImmediate);
    });
    AppWrapper.update();

    // then: EventList change the list of events accordingly
    const eventListWrapper = AppWrapper.find(EventList);
    const actualEvents = eventListWrapper.props().events;
    expect(actualEvents).toEqual(expectedFilteredEvents);

    const eventListItems = eventListWrapper.find('.event-list li');
    expect(eventListItems).toHaveLength(expectedFilteredEvents.length);
  });

  test('Display all events if user selects All Cities', async () => {
    // Given: SuggestionsList displays a list of locations
    const suggestions = AppWrapper.find(CitySearch).find(
      '.city-search_suggestions li',
    );
    expect(suggestions).toHaveLength(2);

    // when: user clicks on All Cities
    const allCitiesSuggestion = suggestions.at(1);
    await act(() => {
      allCitiesSuggestion.simulate('click');
      return new Promise(setImmediate);
    });
    AppWrapper.update();

    // then: all events are displayed
    const eventListWrapper = AppWrapper.find(EventList);
    expect(eventListWrapper.props().events).toEqual(allEvents);

    const eventListItems = eventListWrapper.find('.event-list li');
    expect(eventListItems).toHaveLength(allEvents.length);
  });
});

describe('<App /> integration: specify the number of events', () => {
  let AppWrapper: ReactWrapper<typeof App>;
  const { ResizeObserver } = window;

  beforeEach(async () => {
    // Mock resize observer https://github.com/maslianok/react-resize-detector#testing-with-enzyme-and-jest
    //@ts-ignore
    delete window.ResizeObserver;
    window.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));

    await act(() => {
      AppWrapper = mount(<App />);
      return new Promise(setImmediate);
    });
    AppWrapper.update();
  });
  afterEach(() => {
    window.ResizeObserver = ResizeObserver;
    jest.restoreAllMocks();

    AppWrapper.unmount();
  });

  test('list of events is not grater than the default number of events', () => {
    const numberOfEvents = defaultNumberOfEvents;
    const eventList = AppWrapper.find(EventList).find('.event-list li');
    expect(eventList.length).not.toBeGreaterThan(numberOfEvents);
  });

  test('when changing number of events, list of events is not greater than number of events', async () => {
    const newValue = '5';
    const numberOfEventsInput = AppWrapper.find(NumberOfEvents).find(
      '.number-of-events_input',
    );
    await act(() => {
      numberOfEventsInput.simulate('change', { target: { value: newValue } });
      return new Promise(setImmediate);
    });
    AppWrapper.update();
    const eventList = AppWrapper.find(EventList).find('.event-list li');
    expect(eventList.length).not.toBeGreaterThan(Number(newValue));
  });
});
