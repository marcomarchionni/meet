import { ShallowWrapper, shallow } from 'enzyme';
import CitySearch from '../CitySearch';
import { extractLocations } from '../api';
import { mockData } from '../mock-data';

describe('<CitySearch /> component', () => {
  let CitySearchWrapper: ShallowWrapper<typeof CitySearch>;
  let locations: string[];
  let query: string;
  let location: string;
  beforeAll(() => {
    locations = extractLocations(mockData);
    location = locations[0];
    query = location.slice(0, 2);
    CitySearchWrapper = shallow(
      <CitySearch locations={locations} location={''} setLocation={() => {}} />,
    );
  });

  test('render text input', () => {
    expect(CitySearchWrapper.find('.city-search_input')).toHaveLength(1);
  });

  test('render suggestions when city-search input is focused', () => {
    CitySearchWrapper.find('.city-search_input').simulate('focus');
    expect(
      CitySearchWrapper.find('.city-search_suggestions li'),
    ).not.toHaveLength(0);
  });

  test('render all suggestions when city-search input is focused and query empty', () => {
    CitySearchWrapper.find('.city-search_input').simulate('focus');
    expect(CitySearchWrapper.find('.city-search_suggestions li')).toHaveLength(
      3,
    );
  });

  test('hide suggestions when city-search input loses focus', () => {
    CitySearchWrapper.find('.city-search_input').simulate('blur');
    expect(CitySearchWrapper.find('.city-search_suggestions li')).toHaveLength(
      0,
    );
  });

  test('render initial text input as empty string', () => {
    expect(CitySearchWrapper.find('.city-search_input').prop('value')).toBe('');
  });

  test('render text when input changes', () => {
    CitySearchWrapper.find('.city-search_input').simulate('change', {
      target: {
        value: query,
      },
    });
    expect(CitySearchWrapper.find('.city-search_input').prop('value')).toBe(
      query,
    );
  });

  test('render suggestions matching user input', () => {
    // when: insert query in city search input
    const citySearchInput = CitySearchWrapper.find('.city-search_input');
    citySearchInput.simulate('focus');
    citySearchInput.simulate('change', {
      target: {
        value: query,
      },
    });

    //then: SuggestionsList display suggestions accordingly
    expect(CitySearchWrapper.find('.city-search_suggestions li')).toHaveLength(
      2,
    );
    expect(
      CitySearchWrapper.find('.city-search_suggestions li').at(0).text(),
    ).toBe(location);
  });

  test('selecting a suggestion should change input value and hide suggestions', () => {
    // given: user input triggers the suggestions list
    CitySearchWrapper.find('.city-search_input').simulate('change', {
      target: {
        value: query,
      },
    });

    // when: user clicks on a suggestion
    CitySearchWrapper.find('.city-search_suggestions li')
      .at(0)
      .simulate('click');

    // then: input value is replaced with the suggestion
    expect(CitySearchWrapper.find('.city-search_input').prop('value')).toBe(
      location,
    );
    expect(CitySearchWrapper.find('.city-search_suggestions li')).toHaveLength(
      0,
    );
  });

  test('click outside input or suggestions should hide suggestion list', () => {
    // focus on input to show suggestions
    const citySearchInput = CitySearchWrapper.find('.city-search_input');
    citySearchInput.simulate('focus');
    expect(
      CitySearchWrapper.find('.city-search_suggestions li'),
    ).not.toHaveLength(0);

    // when: input loses focus
    citySearchInput.simulate('blur', {
      relatedTarget: {
        className: 'other-element',
      },
    });
    expect(CitySearchWrapper.find('.city-search_suggestions li')).toHaveLength(
      0,
    );
  });

  test('click outside input on suggestions should NOT hide suggestion list', () => {
    // focus on input to show suggestions
    const citySearchInput = CitySearchWrapper.find('.city-search_input');
    citySearchInput.simulate('focus');
    expect(
      CitySearchWrapper.find('.city-search_suggestions li'),
    ).not.toHaveLength(0);

    // when: input loses focus
    citySearchInput.simulate('blur', {
      relatedTarget: {
        className: 'city-search_suggestions',
      },
    });
    expect(
      CitySearchWrapper.find('.city-search_suggestions li'),
    ).not.toHaveLength(0);
  });
});
