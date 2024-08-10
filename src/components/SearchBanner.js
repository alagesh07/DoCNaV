import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaMapMarkerAlt } from 'react-icons/fa';
import './SearchBanner.css';

const SearchBanner = () => {
  const [conditionQuery, setConditionQuery] = useState('');
  const [conditionSuggestions, setConditionSuggestions] = useState([]);
  const [conditionHighlightedIndex, setConditionHighlightedIndex] = useState(-1);

  const [cityQuery, setCityQuery] = useState('');
  const [citySuggestions, setCitySuggestions] = useState([]);
  const [cityHighlightedIndex, setCityHighlightedIndex] = useState(-1);

  const conditionInputRef = useRef(null);
  const cityInputRef = useRef(null);

  const navigate = useNavigate();

  const conditions = [
    'Cardiologist',
    'Neurologist',
    'Orthopedic',
    'Dentist',
    'ENT',
    'Eye Doctor',
  ];

  const cities = [
    'Gandhipuram',
    'Avinashi Road',
    'Race Course',
    'Ukkadam',
    'Town Hall',
  ];

  const handleConditionInputChange = (e) => {
    const value = e.target.value;
    setConditionQuery(value);
    if (value) {
      const filteredSuggestions = conditions.filter(condition =>
        condition.toLowerCase().includes(value.toLowerCase())
      );
      setConditionSuggestions(filteredSuggestions);
    } else {
      setConditionSuggestions([]);
    }
    setConditionHighlightedIndex(-1);
  };

  const handleCityInputChange = (e) => {
    const value = e.target.value;
    setCityQuery(value);
    if (value) {
      const filteredSuggestions = cities.filter(city =>
        city.toLowerCase().includes(value.toLowerCase())
      );
      setCitySuggestions(filteredSuggestions);
    } else {
      setCitySuggestions([]);
    }
    setCityHighlightedIndex(-1);
  };

  const handleSuggestionClick = (suggestion, type) => {
    if (type === 'condition') {
      setConditionQuery(suggestion);
      setConditionSuggestions([]);
      conditionInputRef.current.focus();
    } else if (type === 'city') {
      setCityQuery(suggestion);
      setCitySuggestions([]);
      cityInputRef.current.focus();
    }
  };

  const handleKeyDown = (e, type) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (type === 'condition' && conditionHighlightedIndex < conditionSuggestions.length - 1) {
          setConditionHighlightedIndex(conditionHighlightedIndex + 1);
        } else if (type === 'city' && cityHighlightedIndex < citySuggestions.length - 1) {
          setCityHighlightedIndex(cityHighlightedIndex + 1);
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (type === 'condition' && conditionHighlightedIndex > 0) {
          setConditionHighlightedIndex(conditionHighlightedIndex - 1);
        } else if (type === 'city' && cityHighlightedIndex > 0) {
          setCityHighlightedIndex(cityHighlightedIndex - 1);
        }
        break;
      case 'Enter':
        e.preventDefault();
        if (type === 'condition' && conditionHighlightedIndex >= 0) {
          handleSuggestionClick(conditionSuggestions[conditionHighlightedIndex], 'condition');
        } else if (type === 'city' && cityHighlightedIndex >= 0) {
          handleSuggestionClick(citySuggestions[cityHighlightedIndex], 'city');
        }
        break;
      case 'Escape':
        if (type === 'condition') {
          setConditionSuggestions([]);
        } else if (type === 'city') {
          setCitySuggestions([]);
        }
        break;
      default:
        break;
    }
  };

  const handleSearch = () => {
    if (conditionQuery && cityQuery) {
      navigate(`/main?condition=${encodeURIComponent(conditionQuery)}&city=${encodeURIComponent(cityQuery)}`);
    }
  };

  return (
    <div className="search-banner">
      <div className="search-banner-content">
        <h1>Search for Nearby Specialist</h1>
        <div className="search-inputs">
          <div className="input-container">
            <FaSearch className="input-icon" />
            <input
              type="text"
              value={conditionQuery}
              onChange={handleConditionInputChange}
              onKeyDown={(e) => handleKeyDown(e, 'condition')}
              placeholder="Condition, procedure, doctor..."
              ref={conditionInputRef}
            />
            {conditionSuggestions.length > 0 && (
              <div className="suggestions">
                {conditionSuggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className={`suggestion-item ${index === conditionHighlightedIndex ? 'highlighted' : ''}`}
                    onClick={() => handleSuggestionClick(suggestion, 'condition')}
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="input-container">
            <FaMapMarkerAlt className="input-icon" />
            <input
              type="text"
              value={cityQuery}
              onChange={handleCityInputChange}
              onKeyDown={(e) => handleKeyDown(e, 'city')}
              placeholder="City, state, or zip code"
              ref={cityInputRef}
            />
            {citySuggestions.length > 0 && (
              <div className="suggestions">
                {citySuggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className={`suggestion-item ${index === cityHighlightedIndex ? 'highlighted' : ''}`}
                    onClick={() => handleSuggestionClick(suggestion, 'city')}
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            )}
          </div>
          <button className="search6-button" onClick={handleSearch}>
            <FaSearch />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBanner;
