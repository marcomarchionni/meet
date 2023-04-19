import React from 'react';
import { useState } from 'react';

interface CitySearchProps {
  locations: string[];
  updateEvents: (location: string) => void;
}

const CitySearch = ({ locations, updateEvents }: CitySearchProps) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const updateSuggestions = (value: string) => {
    const filteredLocations = locations.filter((location) =>
      location.toUpperCase().includes(value.toUpperCase()),
    );
    setSuggestions(filteredLocations);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    updateSuggestions(value);
  };

  const handleItemClicked = (suggestion: string) => {
    setQuery(suggestion);
    updateEvents(suggestion);
    setShowSuggestions(false);
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    const focusOnSuggestions =
      e &&
      e.relatedTarget &&
      e.relatedTarget.className === 'city-search_suggestions';
    if (!focusOnSuggestions) setShowSuggestions(false);
  };

  return (
    <div className="city-search">
      <input
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
