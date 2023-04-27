import { useState } from 'react';
import { defaultNumberOfEvents } from './defaults';
import { ErrorAlert } from './Alert';

interface NumberOfEventsProps {
  setNumberOfEvents: (value: number) => void;
}

const NumberOfEvents = ({ setNumberOfEvents }: NumberOfEventsProps) => {
  const [value, setValue] = useState<string>('');
  const [errorText, setErrorText] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyDigitsValue = e.target.value.replace(/\D/g, '');
    if (onlyDigitsValue === '') {
      setValue('');
      setNumberOfEvents(defaultNumberOfEvents);
      setErrorText('');
      return;
    }
    const numericValue = parseInt(onlyDigitsValue);
    if (numericValue < 1 || numericValue > defaultNumberOfEvents) {
      setValue('');
      setNumberOfEvents(defaultNumberOfEvents);
      setErrorText(`Only numbers from 1 to ${defaultNumberOfEvents}`);
    } else {
      setValue(numericValue.toString());
      setNumberOfEvents(numericValue);
      setErrorText('');
    }
  };

  const handleBlur = () => {
    setErrorText('');
  };

  return (
    <div className="number-of-events">
      <ErrorAlert text={errorText} />
      <input
        id="number-of-events_input"
        placeholder="Number of events"
        type="text"
        className="number-of-events_input"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </div>
  );
};

export default NumberOfEvents;
