import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./styles/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faTrash,
  faArrowsRotate,
} from "@fortawesome/free-solid-svg-icons";
import SearchBar from "./SearchBar";
import {
  deleteItem,
  searchItem,
  resetItems,
} from "../features/counter/SaveContactsSlice";

const DisplayContacts = () => {
  const dispatch = useDispatch();
  const [searchKey, setSearchKey] = useState("");
  const allDetails = useSelector((state) => state.saveContacts.contactDetails);
  const searchDetails = useSelector(
    (state) => state.saveContacts.searchDetails
  );

  const deleteButton = (id) => {
    dispatch(deleteItem(id));
  };

  useEffect(() => {   
    setTimeout(() => {
      if (searchKey !== "") {
        dispatch(searchItem(searchKey));
      }
    }, 500);
  }, [searchKey]);
  const resetList = () => {
    dispatch(resetItems());  
  };

  return (
    <div className="list-container">
      <SearchBar setSearchKey={setSearchKey} searchKey={searchKey} />
      <div className="refresh-button-container">
      <button type="button" className="refresh-btn" onClick={resetList}>
        <FontAwesomeIcon icon={faArrowsRotate} size="lg" />
      </button>
      </div>      
      <div className="message-container">
      {searchDetails.length === 0 && searchKey && "No results found !"}
      {searchDetails.length !== 0 && searchDetails.length + " Results found "}
      </div>      
      <ul>
        {(searchDetails.length === 0 &&
          allDetails.map((detail) => {
            const { id, name, mobileNumber, email } = detail || {};
            return (
              <li key={id} className="contact-item">
                <FontAwesomeIcon icon={faUser} className="list-icon" />
                {name || ""} |{mobileNumber || ""}|{email || ""}
                <button
                  type="button"
                  className="delete-btn"
                  onClick={() => deleteButton(id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </li>
            );
          })) ||
          searchDetails.map((detail) => {
            const { id, name, mobileNumber, email } = detail || {};
            return (
              <li key={id} className="contact-item">
                <FontAwesomeIcon icon={faUser} className="list-icon" />
                {name || ""} |{mobileNumber || ""}|{email || ""}
                <button
                  type="button"
                  className="delete-btn"
                  onClick={() => deleteButton(id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </li>
            );
          })}
      </ul>
    </div>
  );
};
export default DisplayContacts;
