import { ShallowWrapper, shallow } from 'enzyme';
import CitySearch from '../CitySearch';
import { extractLocations } from '../api';
import { mockData } from '../mock-data';

describe('<CitySearch /> component', () => {
  let CitySearchWrapper: ShallowWrapper<typeof CitySearch>;
  let locations: string[];
  beforeAll(() => {
    locations = extractLocations(mockData);
    CitySearchWrapper = shallow(<CitySearch locations={locations} />);
  });

  test('render text input', () => {
    expect(CitySearchWrapper.find('.city')).toHaveLength(1);
  });

  test('render list of suggestions', () => {
    expect(CitySearchWrapper.find('.suggestions')).toHaveLength(1);
  });

  test('render initial text input as empty string', () => {
    expect(CitySearchWrapper.find('.city').prop('value')).toBe('');
  });

  test('render text when input changes', () => {
    CitySearchWrapper.find('.city').simulate('change', {
      target: {
        value: 'Rome',
      },
    });
    expect(CitySearchWrapper.find('.city').prop('value')).toBe('Rome');
  });

  test('render suggestions matching user input', () => {
    const location = locations[0];
    const query = location.slice(0, 2);
    CitySearchWrapper.find('.city').simulate('change', {
      target: {
        value: query,
      },
    });
    expect(CitySearchWrapper.find('.suggestions li')).toHaveLength(2);
    expect(CitySearchWrapper.find('.suggestions li').at(0).text()).toBe(
      location,
    );
  });

  test('selecting a suggestion should change input value', () => {
    // given
    const location = locations[0];
    const query = location.slice(0, 2);
    CitySearchWrapper.find('.city').simulate('change', {
      target: {
        value: query,
      },
    });

    // when
    CitySearchWrapper.find('.suggestions li').at(0).simulate('click');

    // then
    expect(CitySearchWrapper.find('.city').prop('value')).toBe(location);
  });
});
