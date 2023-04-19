import { useState } from 'react';

const NumberOfEvents = () => {
  const [value, setValue] = useState('32');
  return (
    <div className="number-of-events">
      <label htmlFor="number-of-events_input">Number of events</label>
      <input
        id="number-of-events_input"
        type="text"
        className="number-of-events_input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default NumberOfEvents;
