import React from "react";
import { useSelector } from "react-redux";
import './styles/style.css'

const DisplayContacts = () => {
  const details = useSelector((state) => state.saveContacts.contactDetails);
  console.log(details);
  return (
    <>
      <ul>
        {details.map((detail, key) => (
          <li key={detail.name}>
            {detail.name} | {detail.mobileNumber}|{detail.email}
          </li>
        ))}
      </ul>
    </>
  );
};
export default DisplayContacts;
