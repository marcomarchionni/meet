import { ShallowWrapper, shallow } from 'enzyme';
import { defineFeature, loadFeature } from 'jest-cucumber';
import Event from '../Event';
import { mockData } from '../mock-data';

const feature = loadFeature('./src/features/showHideAnEventDetails.feature');

defineFeature(feature, (test) => {
  let EventWrapper: ShallowWrapper<typeof Event>;
  const event = mockData[0];

  test('An event element is collapsed by default', ({ given, when, then }) => {
    given('the app displayed a list of events', () => {
      EventWrapper = shallow(<Event event={event} />);
    });

    when('the user does not interact with any event element', () => {});

    then('the event element should be collapsed', () => {
      expect(EventWrapper.find('.event_description')).toHaveLength(0);
    });
  });

  test('User can expand an event to see its details', ({
    given,
    when,
    then,
  }) => {
    given('the app displayed a list of events', () => {
      EventWrapper = shallow(<Event event={event} />);
    });

    when('the user clicks on an event element button', () => {
      EventWrapper.find('.event_details-button').simulate('click');
    });

    then('the event element should expand to show the event details', () => {
      expect(EventWrapper.find('.event_description')).toHaveLength(1);
    });
  });

  test('User can collapse an event to hide its details', ({
    given,
    when,
    then,
  }) => {
    given('an event element is expanded', () => {
      EventWrapper = shallow(<Event event={event} />);
      EventWrapper.find('.event_details-button').simulate('click');
      expect(EventWrapper.find('.event_description')).toHaveLength(1);
    });

    when('the user clicks on an event element button', () => {
      EventWrapper.find('.event_details-button').simulate('click');
    });

    then('the event element should collapse and hide its details', () => {
      expect(EventWrapper.find('.event_description')).toHaveLength(0);
    });
  });
});
