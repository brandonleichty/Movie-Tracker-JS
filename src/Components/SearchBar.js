import React from "react";

const SearchBar = props => {
  const { setNavBarLocation, setQuery } = props;

  return (
    <div className="search-container">
      <i className="fas fa-search" />
      <input
        className="search-input"
        type="search"
        placeholder="Search for a movie..."
        // value={value}
        onChange={event => setQuery(event.target.value)}
      />
    </div>
  );
};

export default SearchBar;
