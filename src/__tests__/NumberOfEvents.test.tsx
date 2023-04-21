import { ShallowWrapper, shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsWrapper: ShallowWrapper<typeof NumberOfEvents>;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(
      <NumberOfEvents setNumberOfEvents={() => {}} />,
    );
  });

  test('render textbox', () => {
    expect(NumberOfEventsWrapper.find('.number-of-events_input')).toHaveLength(
      1,
    );
  });

  // test('render default value in textbox', () => {
  //   expect(
  //     NumberOfEventsWrapper.find('.number-of-events_input').prop('value'),
  //   ).toBe(defaultNumber.toString());
  // });

  test('render new value when input changes', () => {
    const newValue = '20';
    // when
    NumberOfEventsWrapper.find('.number-of-events_input').simulate('change', {
      target: { value: newValue },
    });

    //then
    expect(
      NumberOfEventsWrapper.find('.number-of-events_input').prop('value'),
    ).toBe(newValue);
  });

  test('when input is NaN, leave input blank', () => {
    const invalidValue = 'aaa';
    // when
    NumberOfEventsWrapper.find('.number-of-events_input').simulate('change', {
      target: { value: invalidValue },
    });
    // then
    expect(
      NumberOfEventsWrapper.find('.number-of-events_input').prop('value'),
    ).toBe('');
  });
});
