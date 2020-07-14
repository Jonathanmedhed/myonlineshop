import axios from "axios";

/** Assign Token to Header */
const setAuthToken = (token) => {
  if (token) {
    //add token to headers
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
  }
};
export default setAuthToken;
