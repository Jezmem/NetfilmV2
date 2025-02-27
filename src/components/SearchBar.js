// SearchBar.js
import React, { useState } from "react";

export default function SearchBar({ query, onSearch }) {
  const [searchTerm, setSearchTerm] = useState(query);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center bg-white p-2 rounded-lg shadow-md">
      <input
        type="text"
        placeholder="Rechercher un film..."
        value={searchTerm}
        onChange={handleChange}
        className="p-2 rounded-l-lg focus:outline-none"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-r-lg">🔍</button>
    </form>
  );
}
