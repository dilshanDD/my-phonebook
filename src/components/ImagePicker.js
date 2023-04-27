import React from "react";

const ImagePicker = ({ setUserData, userData }) => {
  function handleImageInputChange(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const imageBlob = new Blob([reader.result], { type: file.type });
      setUserData({ ...userData, picture: URL.createObjectURL(imageBlob) });
    };
    reader.readAsArrayBuffer(file);
    event.target.value = '';
  }

  return (
    <div className="profile-image">
      <div className="image-preview">
        <img id="preview" src={userData.picture} alt="Profile" />
        <label htmlFor="file-upload">Upload</label>
        <input id="file-upload" type="file" onChange={handleImageInputChange} />
      </div>
    </div>
  );
};
export default ImagePicker;
