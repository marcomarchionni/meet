import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';
import { mockData } from '../mock-data';

describe('<Event /> component', () => {
  let EventWrapper;
  let event;
  beforeAll(() => {
    event = mockData[0];
    EventWrapper = shallow(<Event event={event} />);
  });
  test('render event collapsed', () => {
    expect(EventWrapper.find('.eventStartDate')).toHaveLength(1);
    expect(EventWrapper.find('.eventTitle')).toHaveLength(1);
    expect(EventWrapper.find('.eventLocation')).toHaveLength(1);

    const detailsButton = EventWrapper.find('.eventDetailsButton');
    expect(detailsButton).toHaveLength(1);
    expect(detailsButton.text()).toBe('Show Details');
    expect(EventWrapper.find('.eventDescription')).toHaveLength(0);
  });

  test('render event expanded/collapsed when show/hide Details is clicked', () => {
    const showDetailsButton = EventWrapper.find('.eventDetailsButton');
    showDetailsButton.simulate('click');

    expect(EventWrapper.find('.eventCalendarLink')).toHaveLength(1);
    expect(EventWrapper.find('.eventDescription')).toHaveLength(1);
    expect(EventWrapper.find('.eventDetailsButton').text()).toBe(
      'Hide Details',
    );

    const hideDetailsButton = EventWrapper.find('.eventDetailsButton');
    hideDetailsButton.simulate('click');

    expect(EventWrapper.find('.eventCalendarLink')).toHaveLength(0);
    expect(EventWrapper.find('.eventDescription')).toHaveLength(0);
    expect(EventWrapper.find('.eventDetailsButton').text()).toBe(
      'Show Details',
    );
  });
});
