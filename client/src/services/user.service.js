import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3001/api/users/";


const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const auth = {
  getUserBoard
}
export default auth;