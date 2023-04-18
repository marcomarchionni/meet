import { useState } from 'react';
import { Schema$Event } from './interfaces/google-interfaces';

interface EventProps {
  event: Schema$Event;
}

const Event = ({ event }: EventProps) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleShowDetails = () => {
    setShowDetails(!showDetails);
  };
  return (
    <div>
      <h3 className="eventTitle">{event.summary}</h3>
      <p className="eventStartDate">{event.start?.dateTime}</p>
      <p className="eventLocation">{`@${event.summary} | ${event.location}`}</p>
      {showDetails && (
        <>
          {event.htmlLink && (
            <a href={event.htmlLink} className="eventCalendarLink">
              See Details on Google Calendar
            </a>
          )}
          <p className="eventDescription">{event.description}</p>
        </>
      )}
      <button className="eventDetailsButton" onClick={handleShowDetails}>
        {showDetails ? 'Hide Details' : 'Show Details'}
      </button>
    </div>
  );
};

export default Event;
