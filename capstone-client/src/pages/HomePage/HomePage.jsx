import React from "react";
import "./HomePage.scss";
import { useState } from "react";

import Header from "../../components/Header/Header.jsx";
import ItemsDisplay from "../../components/ItemsDisplay/ItemsDisplay.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import Search from "../../components/Search/Search.jsx";
import SearchResult from "../../components/SearchResult/SearchResult.jsx";

export default function HomePage() {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchResults = (results) => {
    setSearchResults(results); // Update state with search results
  };

  const handleClearSearch = () => {
    setSearchResults(null);
  };


  return (
    <div>
      <Header />
      <Search onSearchResults={handleSearchResults} onClearSearch={handleClearSearch} />
      <SearchResult results={searchResults} />
      <ItemsDisplay />
      <Footer />
    </div>
  );
}
