import React, { useState } from "react";
import "./Search.scss";

export default function Search({ onSearchResults }) {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8080/items/search/${query}`
      );
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      onSearchResults(data); // Pass results back to parent
      setError(""); // Clear previous errors
    } catch (error) {
      console.error("Error fetching search results:", error);
      setError("Failed to fetch search results."); // Set error message
    }
  };

  return (
    <div className="search">
      <form onSubmit={handleSubmit} className="search_wrap">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search items..."
          className="search__input"
        />
        <button type="submit" className="search__button">
          Search
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}
