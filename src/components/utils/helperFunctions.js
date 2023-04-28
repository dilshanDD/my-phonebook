import { inputTypes } from "./typeConstants";

export const checkValues = (name, value) => {
  const mobileNumRegex = /^0(7[0125678]|9[4])[0-9]{7}$/;
  const emailAddRegex = /^\S+@\S+\.\S+$/;
  let error = {};
  const { EMAIL, NAME, MOBILE } = inputTypes;

  switch (name) {
    case NAME:
      error[name] = value.trim() === "" ? "Name is required" : "";
      break;
    case EMAIL:
      error[name] = emailAddRegex.test(value) ? "" : "Please enter a valid email";
      break;
    case MOBILE:
      error[name] = mobileNumRegex.test(value) ? "" : "Please enter a valid mobile number";
      break;
    default:
      break;
  }
  return error;
};
