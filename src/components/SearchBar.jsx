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
    <div>
      <h1>Search Bar</h1>
    </div>
    );
} 