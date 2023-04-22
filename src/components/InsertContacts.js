import { useState } from "react";
import "./styles/style.css";
import { useDispatch } from "react-redux";
import { saveDetails } from "../features/counter/SaveContactsSlice";

const InsertContacts = () => {
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
        mobileNumber,
        name,
        email,
      })
    );
    clear();
  };
  return (
    <div className="insert-contacts-container">
      <h3> Create New Contact</h3>
      <form className="form-container">
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
          type="text"
          placeholder="Email"
          className="text-field"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <div className="btn-container">
          <button
            type="button"
            className="btn save-btn"
            onClick={saveContactDetails}
          >
            save
          </button>
          <button type="button" className="btn clear-btn" onClick={clear}>
            clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default InsertContacts;
