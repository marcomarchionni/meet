import { ShallowWrapper, shallow } from 'enzyme';
import Event from '../Event';
import { mockData } from '../mock-data';
import { Schema$Event } from '../interfaces/google-interfaces';

describe('<Event /> component', () => {
  let EventWrapper: ShallowWrapper<typeof Event>;
  let event: Schema$Event;
  beforeAll(() => {
    event = mockData[0];
    EventWrapper = shallow(<Event event={event} />);
  });
  test('render event collapsed', () => {
    expect(EventWrapper.find('.event_start-date')).toHaveLength(1);
    expect(EventWrapper.find('.event_title')).toHaveLength(1);
    expect(EventWrapper.find('.event_location')).toHaveLength(1);

    const detailsButton = EventWrapper.find('.event_details-button');
    expect(detailsButton).toHaveLength(1);
    expect(detailsButton.text()).toBe('Show Details');
    expect(EventWrapper.find('.event_description')).toHaveLength(0);
  });

  test('render event expanded/collapsed when show/hide Details is clicked', () => {
    const showDetailsButton = EventWrapper.find('.event_details-button');
    expect(showDetailsButton).toHaveLength(1);
    showDetailsButton.simulate('click');

    expect(EventWrapper.find('.event_calendar-link a')).toHaveLength(1);
    expect(EventWrapper.find('.event_calendar-link a').props().href).toEqual(
      event.htmlLink,
    );
    expect(EventWrapper.find('.event_description')).toHaveLength(1);
    expect(EventWrapper.find('.event_details-button').text()).toBe(
      'Hide Details',
    );

    const hideDetailsButton = EventWrapper.find('.event_details-button');
    hideDetailsButton.simulate('click');

    expect(EventWrapper.find('.event_calendar-link')).toHaveLength(0);
    expect(EventWrapper.find('.event_description')).toHaveLength(0);
    expect(EventWrapper.find('.event_details-button').text()).toBe(
      'Show Details',
    );
  });
});
