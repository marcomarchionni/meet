import { ReactWrapper, mount } from 'enzyme';
import { defineFeature, loadFeature } from 'jest-cucumber';
import App from '../App';
import { act } from 'react-dom/test-utils';
import { setImmediate } from 'timers';
import NumberOfEvents from '../NumberOfEvents';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, (test) => {
  let AppWrapper: ReactWrapper<typeof App>;
  const { ResizeObserver } = window;

  beforeEach(() => {
    //@ts-ignore
    delete window.ResizeObserver;
    window.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));
  });

  afterEach(() => {
    window.ResizeObserver = ResizeObserver;
    jest.restoreAllMocks();
  });

  test("When a user hasn't specified a number, thirtytwo is the defaut number", ({
    given,
    when,
    then,
  }) => {
    given(
      "the user hasn't specified the number of events to display",
      () => {},
    );

    when('the app displays a list of events', async () => {
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
      expect(AppWrapper.find('.event')).not.toHaveLength(0);
    });

    then(
      'the max number of events displayed at once will not be greater than thirtytwo',
      () => {
        expect(AppWrapper.find('.event').length).not.toBeGreaterThan(32);
      },
    );
  });

  test('User can change the number of events they want to see', ({
    given,
    when,
    then,
  }) => {
    const typeFiveEvent = { target: { value: '5' } };
    given(
      'the max number of events displayed at once was thirtytwo',
      async () => {
        await act(() => {
          AppWrapper = mount(<App />);
          return new Promise(setImmediate);
        });
        AppWrapper.update();
        expect(AppWrapper.find('.event').length).not.toBeGreaterThan(32);
      },
    );

    when(
      'the user change the number of the events to display to five',
      async () => {
        await act(() => {
          AppWrapper.find(NumberOfEvents)
            .find('.number-of-events_input')
            .simulate('change', typeFiveEvent);
          return new Promise(setImmediate);
        });
        AppWrapper.update();
      },
    );

    then('the max number of events displayed at once will be five', () => {
      expect(AppWrapper.find('.event').length).not.toBeGreaterThan(5);
    });
  });
});
