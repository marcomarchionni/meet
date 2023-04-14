import React from 'react';
import { useState } from 'react';

const CitySearch = ({ locations }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    const filteredLocations = locations.filter((location) =>
      location.toUpperCase().includes(value.toUpperCase()),
    );
    setSuggestions(filteredLocations);
  };

  const handleItemClicked = (suggestion) => {
    setQuery(suggestion);
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
        <li key="all">
          <b>See all cities</b>
        </li>
      </ul>
    </div>
  );
};

export default CitySearch;
