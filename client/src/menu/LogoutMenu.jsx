import {
  useContext,
  useState
} from "react";

import { useHistory } from "react-router-dom";

import {
  Grid,
  Menu,
  MenuItem,
  Typography
} from "@material-ui/core";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import HorizontalIcon from "./HorizontalIcon";

import auth from "../services/auth.service";
import { AuthContext } from "../context/AuthContext";

const useStyles = makeStyles(theme => ({
  logout: {
    display: 'flex',
    marginLeft: 'auto'
  }
}));

const BlackTextTypography = withStyles({
  root: {
    color: "#000"
  }
})(Typography);

const option = 'Logout';

const ITEM_HEIGHT = 48;

const logout = () => auth.logout();


export default function LogoutMenu() {

  const classes = useStyles();
  const { setLoggedIn } = useContext(AuthContext)
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
      .then(() => history.push("/login"))
      .catch((err) => console.log("Error logging out: ", err))
  }

  return (
    <Grid
      item
      className={classes.logout}
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
        <MenuItem key={option} selected={option === 'Logout'} onClick={handleClose}>
          <BlackTextTypography
            variant="body2"
            onClick={handleLogout}>
              Logout
          </BlackTextTypography>
        </MenuItem>
      </Menu>
    </Grid>
  );
}