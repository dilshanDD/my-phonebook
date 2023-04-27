import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faTrash,
  faPen,
  faEye,
} from "@fortawesome/free-solid-svg-icons";

const ListItems = ({
  deleteButton,
  name,
  mobileNumber,
  email,
  id,
  picture,
}) => {
  return (
    <li>
      <div className="contact-item-details-container">
        {picture ? (
          <img src={picture} alt="Profile" className="list-picture" />
        ) : (
          <button className="btn">           
            <FontAwesomeIcon icon={faUser} className="icon"/>
          </button>
        )} 
        <span className="contact-details-container">
          {name}
        </span>
      </div>
      <div className="contact-item-edit-delete-view-container">
        <button className="btn">
          <FontAwesomeIcon icon={faEye} className="icon" />
        </button>
        <button className="btn">
          <FontAwesomeIcon icon={faPen} className="icon" />
        </button>
        <button className="btn" onClick={() => deleteButton(id)}>
          <FontAwesomeIcon icon={faTrash} className="icon"/>
        </button>
      </div>
    </li>
  );
};

export default ListItems;
