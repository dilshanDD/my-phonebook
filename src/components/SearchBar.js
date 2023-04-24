import React from "react";
import "./styles/style.css";

const SearchBar = ({setSearchKey, searchKey}) => {
  return (
    <div className="search-bar-container">
      <input type="text" value={searchKey} className="search-bar-input" placeholder="Search" onChange={(event)=>setSearchKey(event.target.value)}/>
    </div>
  );
};

export default SearchBar;
