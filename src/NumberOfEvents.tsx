import { useState } from 'react';

interface NumberOfEventsProps {
  numberOfEvents: number;
  setNumberOfEvents: (value: number) => void;
}

const NumberOfEvents = ({
  numberOfEvents,
  setNumberOfEvents,
}: NumberOfEventsProps) => {
  const [value, setValue] = useState<string>(numberOfEvents.toString());

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = parseInt(e.target.value);
    if (!Number.isNaN(numericValue)) {
      setValue(e.target.value);
      setNumberOfEvents(numericValue);
    } else {
      setValue('');
    }
  };

  return (
    <div className="number-of-events">
      <label htmlFor="number-of-events_input">Number of events</label>
      <input
        id="number-of-events_input"
        type="text"
        className="number-of-events_input"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default NumberOfEvents;
