import { useState, useEffect } from "react";
import "./styles/style.css";
import { useDispatch, useSelector } from "react-redux";
import {
  saveDetails,
  updateItemById,
} from "../features/counter/SaveContactsSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRectangleXmark,
  faPhone,
  faEnvelopeOpenText,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import ImagePicker from "./ImagePicker";
import { typeConstants } from "./utils/typeConstants";

const InsertContacts = ({ type, selectedId, isOpen, closeModal }) => {
  const { EDIT, INSERT } = typeConstants;
  const dispatch = useDispatch();
  const contact = useSelector((state) => state.saveContacts.contactDetails);
  const [userData, setUserData] = useState({
    id: "",
    mobileNumber: "",
    name: "",
    email: "",
    picture: "",
  });

  const clear = () => {
    setUserData({
      ...userData,
      id: "",
      name: "",
      mobileNumber: "",
      email: "",
      picture: "",
    });
  };

  const saveContactDetails = () => {
    const { id, mobileNumber, name, email, picture } = userData || {};
    switch (type) {
      case EDIT:
        dispatch(
          updateItemById({
            id,
            mobileNumber,
            name,
            email,
            picture,
          })
        );
        break;
      case INSERT:
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
        break;

      default:
        break;
    }
  };
  const setUpdateContactDetails = () => {
    const contactDetails = contact.find((obj) => obj.id === selectedId);
    const { id, mobileNumber, name, email, picture } = contactDetails || {};
    setUserData({
      ...userData,
      id: id || "",
      mobileNumber: mobileNumber || "",
      name: name || "",
      email: email || "",
      picture: picture || "",
    });
  };

  useEffect(() => {
    if (type === EDIT) {
      setUpdateContactDetails();
    } else {
      clear();
    }
  }, [type]);

  if (!isOpen) return null;
  return (
    <div className="insert-contacts-container">
      <div className="modal-container">
        <button className="modal-close-button" onClick={closeModal}>
          <FontAwesomeIcon icon={faRectangleXmark} />
        </button>
        {type === INSERT ? (
          <h3> Create new contact</h3>
        ) : (
          <h3> Update contact</h3>
        )}

        <div className="image-upload-container">
          <ImagePicker setUserData={setUserData} userData={userData} />
        </div>
        <form className="form-container">
          <div className="text-field-container">
            <FontAwesomeIcon icon={faPhone} className="input-icon"/>
            <input
              type="text"
              placeholder="Mobile Number"
              className="text-field"
              value={userData.mobileNumber}
              onChange={(event) =>
                setUserData({ ...userData, mobileNumber: event.target.value })
              }
            />
          </div>
          <div className="text-field-container">
          <FontAwesomeIcon icon={faUser} className="input-icon"/>
          <input
            type="text"
            placeholder="Name"
            className="text-field"
            value={userData.name}
            onChange={(event) =>
              setUserData({ ...userData, name: event.target.value })
            }
          />
          </div>
          <div className="text-field-container">
          <FontAwesomeIcon icon={faEnvelopeOpenText} className="input-icon"/>
          <input
            type="email"
            placeholder="Email"
            className="text-field"
            value={userData.email}
            onChange={(event) =>
              setUserData({ ...userData, email: event.target.value })
            }
          />
          </div>
          <button
            type="button"
            className="save-btn"
            onClick={saveContactDetails}
          >
            {type === INSERT ? `create` : `update`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default InsertContacts;
