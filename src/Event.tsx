import { useState } from 'react';
import { Schema$Event } from './interfaces/google-interfaces';
import { formatDate } from './util';

interface EventProps {
  event: Schema$Event;
}

const Event = ({ event }: EventProps) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleShowDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="event">
      <h3 className="event_title">{event.summary}</h3>
      <p className="event_start-date">{formatDate(event.start?.dateTime)}</p>
      <p className="event_location">{`@${event.summary} | ${event.location}`}</p>
      {showDetails && (
        <>
          {event.htmlLink && (
            <div className="event_calendar-link">
              <a href={event.htmlLink} target="_blank" rel="noreferrer">
                See Details on Google Calendar
              </a>
            </div>
          )}
          <p className="event_description">{event.description}</p>
        </>
      )}
      <button className="event_details-button" onClick={handleShowDetails}>
        {showDetails ? 'Hide Details' : 'Show Details'}
      </button>
    </div>
  );
};

export default Event;
