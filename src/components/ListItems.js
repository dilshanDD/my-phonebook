import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faTrash,  
  faPen,
  faEye,
} from "@fortawesome/free-solid-svg-icons";

const ListItems = ({deleteButton,name,mobileNumber,email,id}) =>{
    return (
        <li>
          <div className="contact-item-details-container">
            <button className="btn">
              <FontAwesomeIcon icon={faUser} />
            </button>
            <span className="contact-details-container">
              {name || ""} |{mobileNumber || ""}|{email || ""}
            </span>
          </div>
          <div className="contact-item-edit-delete-view-container">
            <button className="btn">
              <FontAwesomeIcon icon={faEye} />
            </button>
            <button className="btn">
              <FontAwesomeIcon icon={faPen} />
            </button>
            <button className="btn" onClick={() => deleteButton(id)}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </li>
      );
}

export default ListItems;