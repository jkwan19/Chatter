import axios from "axios";

const API_URL = "/api/users/";

const register = (username, email, password) => {
  return axios.post(API_URL + "register", {
    username,
    email,
    password,
  })
    .then((res) => res.data)
    .catch((err) => console.log("Register error: " + err));
};

const login = (email, password) => {
  return axios.post(API_URL + "login", {
      email,
      password,
    })
    .then((res) => res.data)
    .catch(err => console.log("Login error: " + err));
};

const logout = () => {
  return axios.post(API_URL + "logout")
    .then((res) => res.data)
    .catch((err) => console.log("Error logging out: ", err));
};

const isAuth = () => {
  return axios.get(API_URL + 'is_authenticated')
    .then((res) => res.data)
    .catch((err) => console.log("Error authenticating: ", err))
}

const auth = {
  register,
  login,
  logout,
  isAuth
};

export default auth;
