import React from "react";

const SearchBar = props => {
  const { setNavBarLocation, setQuery } = props;

  return (
    <div className="main-nav">
      <input
        type="search"
        placeholder="type here"
        // value={value}
        onChange={event => setQuery(event.target.value)}
      />
    </div>
  );
};

export default SearchBar;
