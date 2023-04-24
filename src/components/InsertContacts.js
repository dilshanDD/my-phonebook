import { useState } from "react";
import "./styles/style.css";
import { useDispatch } from "react-redux";
import { saveDetails } from "../features/counter/SaveContactsSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRectangleXmark } from "@fortawesome/free-solid-svg-icons";

const InsertContacts = ({ isOpen, closeModal }) => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const clear = () => {
    setMobileNumber("");
    setName("");
    setEmail("");
  };
  const saveContactDetails = () => {
    dispatch(
      saveDetails({
        id: Math.floor(Math.random() * 1000),
        mobileNumber,
        name,
        email,
      })
    );
    clear();
  };
  if (!isOpen) return null;
  return (
    <div className="insert-contacts-container">
      <div className="modal-container">
        <button className="modal-close-button" onClick={closeModal}>
          <FontAwesomeIcon icon={faRectangleXmark} />
        </button>
        <h3> Create New Contact</h3>
        <form className="form-container">
          <input
            type="file"
            className="insert-image-container"
            placeholder="Profile Picture"
          />
          <input
            type="text"
            placeholder="Mobile Number"
            className="text-field"
            value={mobileNumber}
            onChange={(event) => setMobileNumber(event.target.value)}
          />
          <input
            type="text"
            placeholder="Name"
            className="text-field"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="text-field"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <button
            type="button"
            className="save-btn"
            onClick={saveContactDetails}
          >
            save
          </button>
        </form>
      </div>
    </div>
  );
};

export default InsertContacts;
