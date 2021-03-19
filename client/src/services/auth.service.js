import axios from "axios";

const API_URL = "/api/users/";

const register = (username, email, password) => {
  return axios.post(API_URL + "register", {
    username,
    email,
    password,
  })
};

const login = (email, password) => {
  return axios.post(API_URL + "login", {
      email,
      password,
    })
    .then((res) => {
      if (res.data.token) {
        localStorage.setItem("user", JSON.stringify(res.data))
      }
      return res.data;
    })
    .catch(err => console.log("Login error: " + err));
};

const logout = () => {
  return axios.post(API_URL + "logout")
    .then((res) => {
      localStorage.removeItem("user");
    })
    .catch((err) => console.log("Error logging out: ", err));
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const auth = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default auth;
