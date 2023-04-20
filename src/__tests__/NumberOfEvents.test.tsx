import { ShallowWrapper, shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsWrapper: ShallowWrapper<typeof NumberOfEvents>;
  const defaultNumber = 5;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(
      <NumberOfEvents
        numberOfEvents={defaultNumber}
        setNumberOfEvents={() => {}}
      />,
    );
  });

  test('render textbox', () => {
    expect(NumberOfEventsWrapper.find('.number-of-events_input')).toHaveLength(
      1,
    );
  });

  test('render default value in textbox', () => {
    expect(
      NumberOfEventsWrapper.find('.number-of-events_input').prop('value'),
    ).toBe(defaultNumber);
  });

  test('render new value when input changes', () => {
    const newValue = 20;
    // when
    NumberOfEventsWrapper.find('.number-of-events_input').simulate('change', {
      target: { value: newValue },
    });

    //then
    expect(
      NumberOfEventsWrapper.find('.number-of-events_input').prop('value'),
    ).toBe(newValue);
  });
});
