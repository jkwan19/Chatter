import {
  useContext,
  useState,
} from "react";

import { useHistory } from "react-router-dom";

import {
  Grid,
  Menu,
  MenuItem,
  Typography
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import HorizontalIcon from "./HorizontalIcon";

import socket from "../socket";
import auth from "../services/auth.service";
import { AuthContext } from "../context/AuthContext";

const useStyles = makeStyles(theme => ({
  blackText: {
    color: "#000"
  },
}));

const ITEM_HEIGHT = 48;

const logout = () => auth.logout();


export default function LogoutMenu( { handleLogoutError }) {

  const classes = useStyles();
<<<<<<< HEAD
  const { setLoggedIn, userId } = useContext(AuthContext)
=======
  const { setLoggedIn, setUser } = useContext(AuthContext)
>>>>>>> master
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const history = useHistory();


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout()
      .then((res) => setLoggedIn(false))
<<<<<<< HEAD
      .then(() => socket.emit('update_logout', {
        userId
      }))
=======
>>>>>>> master
      .then(() => history.push("/login"))
      .catch((err) => handleLogoutError())
  }


  return (
    <Grid
      item container xs={4} sm={4} md={4}
      justify="flex-end"
      >
      <HorizontalIcon handleClick={handleClick}/>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        <MenuItem
          className={classes.blackText}
          key={'Logout'}
          selected={true}
          onClick={() => {
            handleClose();
            handleLogout();
          }}>
          <Typography
            variant="body2"
            >
            Logout
          </Typography>
        </MenuItem>
      </Menu>
    </Grid>
  );
}