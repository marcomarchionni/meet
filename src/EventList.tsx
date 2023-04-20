import Event from './Event';
import { Schema$Event } from './interfaces/google-interfaces';

interface EventListProps {
  events: Schema$Event[];
}

const EventList = ({ events }: EventListProps) => {
  return (
    <ul className="event-list">
      {events.map((event) => (
        <li key={event.id}>
          <Event event={event} />
        </li>
      ))}
    </ul>
  );
};
export default EventList;
