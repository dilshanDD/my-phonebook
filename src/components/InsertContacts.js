import { useState } from "react";
import "./styles/style.css";
import { useDispatch } from "react-redux";
import { saveDetails } from "../features/counter/SaveContactsSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRectangleXmark } from "@fortawesome/free-solid-svg-icons";
import ImagePicker from "./ImagePicker";

const InsertContacts = ({ isOpen, closeModal }) => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    mobileNumber: "",
    name: "",
    email: "",
    picture: "",
  });

  const clear = () => {
    setUserData({
      ...userData,
      name: "",
      mobileNumber: "",
      email: "",
      picture: "",
    });
  };

  const saveContactDetails = () => {
    const { mobileNumber, name, email, picture } = userData || {};   
    dispatch(
      saveDetails({
        id: Math.floor(Math.random() * 1000),
        mobileNumber,
        name,
        email,
        picture,
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
        <div className="image-upload-container">
          <ImagePicker setUserData={setUserData} userData={userData} />
        </div>
        <form className="form-container">
          <input
            type="text"
            placeholder="Mobile Number"
            className="text-field"
            value={userData.mobileNumber}
            onChange={(event) =>
              setUserData({ ...userData, mobileNumber: event.target.value })
            }
          />
          <input
            type="text"
            placeholder="Name"
            className="text-field"
            value={userData.name}
            onChange={(event) =>
              setUserData({ ...userData, name: event.target.value })
            }
          />
          <input
            type="email"
            placeholder="Email"
            className="text-field"
            value={userData.email}
            onChange={(event) =>
              setUserData({ ...userData, email: event.target.value })
            }
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
