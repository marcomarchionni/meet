import { useState } from 'react';
import { defaultNumberOfEvents } from './defaults';

interface NumberOfEventsProps {
  setNumberOfEvents: (value: number) => void;
}

const NumberOfEvents = ({ setNumberOfEvents }: NumberOfEventsProps) => {
  const [value, setValue] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyDigitsValue = e.target.value.replace(/\D/g, '');
    const numericValue = parseInt(onlyDigitsValue);
    if (Number.isNaN(numericValue)) {
      setValue('');
      setNumberOfEvents(defaultNumberOfEvents);
    } else {
      setValue(numericValue.toString());
      setNumberOfEvents(numericValue);
    }
  };

  return (
    <div className="number-of-events">
      {/* <label htmlFor="number-of-events_input">Number of events</label> */}
      <input
        id="number-of-events_input"
        placeholder="Number of events"
        type="text"
        className="number-of-events_input"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default NumberOfEvents;
