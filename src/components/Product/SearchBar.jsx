import React, { useState } from "react"

export default function SearchBar({ onSearch }) {
    const [searchText, setSearchText] = useState('');

    const handleInputChange = (e) => {
        setSearchText(e.target.value);
    };

    const handleSearchClick = () => {
        onSearch(searchText);
    };

return (
    <div className="search-bar">
      <input 
      type="text"
      placeholder="Search products..."
      value={searchText}
      onChange={handleInputChange} 
      />
      <button onClick={handleSearchClick}>Search</button>
    </div>
    );
} 