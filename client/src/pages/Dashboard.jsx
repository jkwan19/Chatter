import { useEffect, useState } from "react";
import {
  Typography
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import auth from "../services/auth.service";

function useLogout() {
  const logout = async() => {
    await auth.logout();
  }
  return logout;
}
export default function Dashboard() {
  const [username, setUsername] = useState('');
  const history = useHistory();
  const logout = useLogout();

  useEffect(() => {
    const user = auth.getCurrentUser();
    setUsername(user.user.username);
    if (!user) history.push("/signup");
  }, [username, history]);

  return (
    <>
      {/* For testing purposes right now, ignore styling */}
      <Typography>Dashboard</Typography>
      <Typography>User: {username}</Typography>
      <button
        onClick={() => {
          logout()
            .then(() => history.push("/login"))
            .catch((err) => console.log("Error logging out: ", err))
        }}
      >
        Logout
      </button>
    </>
  );
}
