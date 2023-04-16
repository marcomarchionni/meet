import React, { useState } from 'react';

interface CitySearchProps {
  locations: string[];
  updateEvents: (location: string) => void;
}

const CitySearch = ({ locations, updateEvents }: CitySearchProps) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    const filteredLocations = locations.filter((location) =>
      location.toUpperCase().includes(value.toUpperCase()),
    );
    setSuggestions(filteredLocations);
  };

  const handleItemClicked = (suggestion: string) => {
    setQuery(suggestion);
    updateEvents(suggestion);
  };

  return (
    <div className="CitySearch">
      <input
        type="text"
        className="city"
        value={query}
        onChange={handleInputChange}
      />
      <ul className="suggestions">
        {suggestions.map((suggestion) => (
          <li key={suggestion} onClick={() => handleItemClicked(suggestion)}>
            {suggestion}
          </li>
        ))}
        <li key="all" onClick={() => handleItemClicked('all')}>
          <b>See all cities</b>
        </li>
      </ul>
    </div>
  );
};

export default CitySearch;
