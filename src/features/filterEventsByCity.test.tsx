import { ReactWrapper, ShallowWrapper, mount, shallow } from 'enzyme';
import { loadFeature, defineFeature } from 'jest-cucumber';
import App from '../App';
import { mockData } from '../mock-data';
import { defaultNumberOfEvents } from '../defaults';
import { act } from 'react-dom/test-utils';
import { setImmediate } from 'timers';
import CitySearch from '../CitySearch';
import { extractLocations } from '../api';
import EventList from '../EventList';

const feature = loadFeature('./src/features/filterEventsByCity.feature');

defineFeature(feature, (test) => {
  test('When user hasn’t searched for a city, show upcoming events from all cities.', ({
    given,
    when,
    then,
  }) => {
    let AppWrapper: ReactWrapper<typeof App>;
    const expectedLength = Math.min(mockData.length, defaultNumberOfEvents);
    given('user hasn’t searched for any city', () => {});

    when('the user opens the app', async () => {
      await act(() => {
        AppWrapper = mount(<App />);
        return new Promise(setImmediate);
      });
    });

    then('the user should see the list of upcoming events.', () => {
      AppWrapper.update();
      expect(AppWrapper.find('.event')).toHaveLength(expectedLength);
    });
  });

  test('User should see a list of suggestions when they search for a city', ({
    given,
    when,
    then,
  }) => {
    let CitySearchWrapper: ShallowWrapper<typeof CitySearch>;
    const locations = extractLocations(mockData);
    given('the main page is open', () => {
      CitySearchWrapper = shallow(
        <CitySearch
          locations={locations}
          location={''}
          setLocation={() => {}}
        />,
      );
    });

    when('the user starts typing in the city textbox', () => {
      CitySearchWrapper.find('.city-search_input').simulate('focus');
      CitySearchWrapper.find('.city-search_input').simulate('change', {
        target: { value: 'Berlin' },
      });
    });

    then(
      'the user should receive a list of cities (suggestions) that match what they’ve typed',
      () => {
        expect(
          CitySearchWrapper.find('.city-search_suggestions li'),
        ).toHaveLength(2);
      },
    );
  });

  test('User can select a city from the suggested list', ({
    given,
    and,
    when,
    then,
  }) => {
    let AppWrapper: ReactWrapper<typeof App>;
    const berlinEvents = mockData.filter(
      (event) => event.location === 'Berlin, Germany',
    );
    given('user was typing “Berlin” in the city textbox', async () => {
      // open app
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
            value: 'Berlin',
          },
        });
        return new Promise(setImmediate);
      });
      AppWrapper.update();
    });

    and('the list of suggested cities is showing', () => {
      expect(
        AppWrapper.find(CitySearch).find('.city-search_suggestions li'),
      ).toHaveLength(2);
    });

    when(
      'the user selects a city (e.g., “Berlin, Germany”) from the list',
      async () => {
        const berlinSuggestion = AppWrapper.find(CitySearch)
          .find('.city-search_suggestions li')
          .at(0);
        expect(berlinSuggestion.text()).toBe('Berlin, Germany');
        await act(() => {
          berlinSuggestion.simulate('click');
          return new Promise(setImmediate);
        });
        AppWrapper.update();
      },
    );

    then(
      'their city should be changed to that city (i.e., “Berlin, Germany”)',
      () => {
        expect(
          AppWrapper.find(CitySearch).find('.city-search_input').props().value,
        ).toBe('Berlin, Germany');
      },
    );

    and(
      'the user should receive a list of upcoming events in that city',
      () => {
        expect(AppWrapper.find(EventList).find('.event-list li')).toHaveLength(
          berlinEvents.length,
        );
      },
    );
  });
});
