import React, { useState } from "react"

export default function SearchBar({ onSearch }) {
    const [searchText, setSearchText] = useState('');

    const handleInputChange = (e) => {
        setSearchText(e.target.value);
    };

    const handleSearch = () => {
        onSearch(searchText);
    };

return (
    <div className="search-container">
        <input 
          type="text"
          placeholder="Search products"
          value={searchText}
          onChange={handleInputChange}
          className="search-bar-input"
        />
        <button className="search-button" onClick={handleSearch}>Search</button>
    </div>
    );
} 