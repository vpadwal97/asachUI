import axios from '../../utils/HttpServices';
import React, { useState, useEffect } from 'react';

function SuggestionTextbox() {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState('');
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  // Function to fetch suggestions from API
  const fetchSuggestions = async () => {
    try {
      // const response = await fetch('https://api.example.com/suggestions'); // replace with your API URL
      const response = await axios.post("/api/getAirports", {
        indexName: "product",
        searchTerm: inputValue
      });
      console.log("response",response);
      // setSearchData(response?.data.data || []);
      // const data = await response?.data.data.json();
      // setSuggestions(data);
      // setFilteredSuggestions(data); // Initialize filtered suggestions to full list
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  // Fetch suggestions when the component mounts
  useEffect(() => {
    fetchSuggestions();
    if (inputValue.length > 0) {
      const filtered = suggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setDropdownVisible(true);
    } else {
      setFilteredSuggestions([]);
      setDropdownVisible(false);
    }
  }, [inputValue]);

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    
  };

  // Handle suggestion selection
  const handleSuggestionSelect = (suggestion) => {
    setInputValue(suggestion);
    setSelectedSuggestion(suggestion);
    setDropdownVisible(false); // Hide dropdown after selection
  };

  // Handle blur (when the input loses focus)
  const handleBlur = () => {
    setTimeout(() => setDropdownVisible(false), 100); // Delay to allow click on suggestion
  };

  return (
    <div className="suggestion-box">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleBlur}
        onFocus={() => setDropdownVisible(true)}
        placeholder="Start typing..."
        className="suggestion-input"
      />
      {isDropdownVisible && filteredSuggestions.length > 0 && (
        <ul className="suggestion-list">
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={index}
              className="suggestion-item"
              onClick={() => handleSuggestionSelect(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SuggestionTextbox;
