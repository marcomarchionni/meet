import React from 'react';
import Event from './Event';
import { calendar_v3 } from 'googleapis';

interface EventListProps {
  events: calendar_v3.Schema$Event[];
}

const EventList = ({ events }: EventListProps) => {
  return (
    <ul className="EventList">
      {events.map((event) => (
        <li key={event.id}>
          <Event event={event} />
        </li>
      ))}
    </ul>
  );
};
export default EventList;
