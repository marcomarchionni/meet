import React from 'react';
import { useState } from 'react';
import { InfoAlert } from './Alert';

interface CitySearchProps {
  locations: string[];
  location: string;
  setLocation: (location: string) => void;
}

const CitySearch = ({ locations, location, setLocation }: CitySearchProps) => {
  const [query, setQuery] = useState(location);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [infoText, setInfoText] = useState('');

  const updateSuggestions = (value: string) => {
    const filteredLocations = locations.filter((location) =>
      location.toUpperCase().includes(value.toUpperCase()),
    );
    setSuggestions(filteredLocations);
    if (filteredLocations.length === 0) {
      setInfoText(`No location match. Please retry!`);
    } else {
      setInfoText('');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    updateSuggestions(value);
  };

  const handleItemClicked = (suggestion: string) => {
    setQuery(suggestion);
    setLocation(suggestion);
    setShowSuggestions(false);
    setInfoText('');
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    const focusOnSuggestions =
      e &&
      e.relatedTarget &&
      e.relatedTarget.className === 'city-search_suggestions';
    if (!focusOnSuggestions) {
      setShowSuggestions(false);
      setInfoText('');
    }
  };

  return (
    <div className="city-search">
      <InfoAlert text={infoText} />
      <input
        placeholder="Location"
        id="city-search_input"
        type="text"
        className="city-search_input"
        value={query}
        onChange={handleInputChange}
        onFocus={() => {
          updateSuggestions(query);
          setShowSuggestions(true);
        }}
        onBlur={handleInputBlur}
      />
      {showSuggestions && (
        <ul className="city-search_suggestions" tabIndex={0}>
          {suggestions.map((suggestion) => (
            <li key={suggestion} onClick={() => handleItemClicked(suggestion)}>
              {suggestion}
            </li>
          ))}
          <li key="all" onClick={() => handleItemClicked('')}>
            <b>See all cities</b>
          </li>
        </ul>
      )}
    </div>
  );
};

export default CitySearch;
