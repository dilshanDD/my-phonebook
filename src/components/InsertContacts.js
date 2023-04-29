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
import ImagePicker from "./otherComponents/ImagePicker";
import { typeConstants } from "./utils/typeConstants";
import { every } from "lodash";
import { checkValues } from "./utils/helperFunctions";
import AlertBox from "./otherComponents/AlertBox";

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
  const [errors, setErrors] = useState({});
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
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

  const handleBlur = (event) => {
    const { name, value } = event.target;
    const error = checkValues(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, ...error }));
  };

  const saveContactDetails = () => {
    const { id, mobileNumber, name, email, picture } = userData || {};
    const validateObj = {
      mobile: mobileNumber,
      name: name,
      email: email,
    };
   
    const entries = Object.entries(validateObj);  
    let hasMessage = false;

    for (const [key, value] of entries) {     
      setErrors((prevErrors) => ({ ...prevErrors, ...checkValues(key, value) }));
      const errorObj  = checkValues(key, value);
      if (typeof errorObj[key] === 'string' && errorObj[key].trim().length > 0) {
        hasMessage = true;        
      }
    }

    if (!hasMessage) {
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
          setAlertOpen(true);
          setAlertMessage("Contact updated successfully");
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
          setAlertOpen(true);
          setAlertMessage("Contact created successfully");
          clear();
          break;

        default:
          break;
      }
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
      <AlertBox
        alertOpen={alertOpen}
        alertMessage={alertMessage}
        setAlertOpen={setAlertOpen}
      />
      <div className="modal-container">
        <button
          className="modal-close-button"
          onClick={() => {
            closeModal();
            setErrors({});
          }}
        >
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
            <FontAwesomeIcon icon={faPhone} className="input-icon" />
            <div className="text-error-container">
              {errors.mobile && (
                <span className="error-message">{errors.mobile}</span>
              )}
              <input
                type="text"
                placeholder="Mobile Number"
                name="mobile"
                id="mobile"
                className={
                  errors.mobile ? "text-field text-field-error" : "text-field"
                }
                onBlur={handleBlur}
                value={userData.mobileNumber}
                onChange={(event) =>
                  setUserData({ ...userData, mobileNumber: event.target.value })
                }
              />
            </div>
          </div>
          <div className="text-field-container">
            <FontAwesomeIcon icon={faUser} className="input-icon" />
            <div className="text-error-container">
              {errors.name && (
                <span className="error-message">{errors.name}</span>
              )}
              <input
                type="text"
                placeholder="Name"
                name="name"
                id="name"
                className={
                  errors.name ? "text-field text-field-error" : "text-field"
                }
                onBlur={handleBlur}
                value={userData.name}
                onChange={(event) =>
                  setUserData({ ...userData, name: event.target.value })
                }
              />
            </div>
          </div>
          <div className="text-field-container">
            <FontAwesomeIcon icon={faEnvelopeOpenText} className="input-icon" />
            <div className="text-error-container">
              {errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
              <input
                type="email"
                placeholder="Email"
                name="email"
                id="email"
                className={
                  errors.email ? "text-field text-field-error" : "text-field"
                }
                onBlur={handleBlur}
                value={userData.email}
                onChange={(event) =>
                  setUserData({ ...userData, email: event.target.value })
                }
              />
            </div>
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
