import React, { useState } from "react";
import "../styles/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRectangleXmark } from "@fortawesome/free-solid-svg-icons";

const AlertBox = ({ alertOpen, alertMessage, setAlertOpen }) => {
  const [closeAnimate, setCloseAnimate] = useState(true);
  if (alertOpen) {
    setTimeout(() => setCloseAnimate(false), 2000);
    setTimeout(() => setAlertOpen(false), 3000);
  }

  if (!alertOpen) return null;
  return (
    <div className={`alert-box${closeAnimate ? "" : " fade-out"}`}>
      <button
        className="modal-close-button"
        onClick={() => {
          setCloseAnimate(false);
          setTimeout(() => setAlertOpen(false), 2000);
        }}
      >
        <FontAwesomeIcon icon={faRectangleXmark} size="xs" />
      </button>
      <div>{alertMessage || ""}</div>
    </div>
  );
};

export default AlertBox;
