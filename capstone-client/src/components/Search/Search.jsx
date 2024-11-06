import React, { useState } from "react";
import "./Search.scss";

export default function Search({ onSearchResults, onClearSearch }) {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [clear, setClear] = useState(false);

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
      setClear(true);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setError("Failed to fetch search results."); // Set error message
    }
  };

  const handleClear = () => {
    setQuery("");
    setError("");
    onClearSearch(); // Call the parent's clear function
    setClear(false);
  };

  return (
    <div className="search">
      <form onSubmit={handleSubmit} className="search_wrap">
        <button type="submit" className="search__button">
          Search
        </button>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search items..."
          className="search__input"
        />

        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>

      <button
        onClick={handleClear}
        className={
          clear ? "search__clear" : "search__clear search__clear--none"
        }
      >
        clear results
      </button>
    </div>
  );
}
