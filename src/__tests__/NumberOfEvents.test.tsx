import { ShallowWrapper, shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsWrapper: ShallowWrapper<typeof NumberOfEvents>;
  const defaultNumber = '32';
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents />);
  });

  test('render textbox', () => {
    expect(NumberOfEventsWrapper.find('.numberOfEventsTextbox')).toHaveLength(
      1,
    );
  });

  test('render default value in textbox', () => {
    expect(
      NumberOfEventsWrapper.find('.numberOfEventsTextbox').prop('value'),
    ).toBe(defaultNumber);
  });

  test('render new value when input changes', () => {
    const newValue = '20';
    // when
    NumberOfEventsWrapper.find('.numberOfEventsTextbox').simulate('change', {
      target: { value: newValue },
    });

    //then
    expect(
      NumberOfEventsWrapper.find('.numberOfEventsTextbox').prop('value'),
    ).toBe(newValue);
  });
});
