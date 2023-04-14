import React, { useState } from 'react';

const NumberOfEvents = () => {
  const [value, setValue] = useState('32');
  return (
    <div>
      <label for="numberOfEventsTextbox">Number of events</label>
      <input
        id="numberOfEventsTextbox"
        type="text"
        className="numberOfEventsTextbox"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default NumberOfEvents;
