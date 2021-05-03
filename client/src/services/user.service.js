import axios from "axios";

const API_URL = "/api/messages/";


const getUsers = () => {
  return axios.get(API_URL)
    .then(res => res.data)
    .catch(err => console.log("Error fetching users: " + err))
};

const auth = {
  getUsers,
}

export default auth;