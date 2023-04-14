import React from 'react';
import { useState } from 'react';

const Event = ({ event }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleShowDetails = () => {
    setShowDetails(!showDetails);
  };
  return (
    <div>
      <h3 className="eventTitle">{event.summary}</h3>
      <p className="eventStartDate">{event.start.dateTime}</p>
      <p className="eventLocation">{`@${event.summary} | ${event.location}`}</p>
      {showDetails && (
        <>
          <a href={event.htmlLink} className="eventCalendarLink">
            See Details on Google Calendar
          </a>
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
