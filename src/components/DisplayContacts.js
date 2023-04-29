import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./styles/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "./otherComponents/SearchBar";
import {
  deleteItem,
  searchItem,
  resetItems,
} from "../features/counter/SaveContactsSlice";
import InsertContacts from "./InsertContacts";
import ListItems from "./otherComponents/ListItems";
import DeveloperDetails from "./DeveloperDetails";
import { typeConstants } from "./utils/typeConstants";

const DisplayContacts = () => {
  const dispatch = useDispatch();
  const [searchKey, setSearchKey] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const { EDIT, INSERT } = typeConstants;
  const  [selectedId, setSelectedId]  = useState("");
  const  [openType, setOpenType]  = useState("");

  const allDetails = useSelector((state) => state.saveContacts.contactDetails);
  const searchDetails = useSelector(
    (state) => state.saveContacts.searchDetails
  );
  const handleOpenModal = () => {
    setOpenType(INSERT);
    setModalOpen(true);    
  };
  const handleEditOpenModal = (id) => {
    setModalOpen(true);
    setSelectedId(id);
    setOpenType(EDIT);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedId('');
    setOpenType('');
  };

  const deleteButton = (id) => {
    dispatch(deleteItem(id));
  };

  useEffect(() => {
    setTimeout(() => {
      if (searchKey !== "") {
        dispatch(searchItem(searchKey));
      }
    }, 500);
  }, [searchKey, dispatch]);

  const resetList = () => {
    dispatch(resetItems());
  };

  return (
    <>
      <InsertContacts
        isOpen={modalOpen}
        closeModal={handleCloseModal}
        type={openType}
        selectedId={selectedId}
      />
      <div className="list-container">
        <h3> My Contacts</h3>
        <SearchBar setSearchKey={setSearchKey} searchKey={searchKey} />
        <div className="refresh-add-user-button-container">
          <button
            className="refresh-btn"
            onClick={() => {
              resetList();
              setSearchKey("");
            }}
          >
            <FontAwesomeIcon icon={faArrowsRotate} size="lg" />
          </button>
          <button className="add-user-btn" onClick={handleOpenModal}>
            <FontAwesomeIcon icon={faUserPlus} size="lg" />
          </button>
        </div>
        <div className="message-container">
          {searchDetails.length === 0 && searchKey && "No results found !"}
          {searchDetails.length !== 0 &&
            searchDetails.length + " Results found "}
        </div>
        <ul>
          {(searchDetails.length === 0 &&
            allDetails.map((detail) => {
              const { id, name, mobileNumber, email, picture } = detail || {};
              return (
                <ListItems
                  deleteButton={deleteButton}
                  handleEditOpenModal={handleEditOpenModal}
                  name={name}
                  mobileNumber={mobileNumber}
                  email={email}
                  id={id}
                  key={id}
                  picture={picture}
                />
              );
            })) ||
            searchDetails.map((detail) => {
              const {  id, name, mobileNumber, email, picture } = detail || {};
              return (
                <ListItems
                deleteButton={deleteButton}
                handleEditOpenModal={handleEditOpenModal}
                name={name}
                mobileNumber={mobileNumber}
                email={email}
                id={id}
                key={id}
                picture={picture}
                />
              );
            })}
        </ul>
        <DeveloperDetails />
      </div>
    </>
  );
};
export default DisplayContacts;
