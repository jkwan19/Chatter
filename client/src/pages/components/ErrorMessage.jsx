import React from "react";

/* MATERIAL UI STYLING */
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";

/* COMPONENTS */
import AccountButton from './AccountButton';
import NoAccountButton from './NoAccountButton';

const useStyles = makeStyles(theme => ({
}));


export default function ErrorMessage(props) {
  const classes = useStyles();

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center"
      }}
      open={props.open}
      autoHideDuration={6000}
      onClose={props.handleClose}
      message={props.message}
      action={
        <React.Fragment>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={props.handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      }
    />
  )
}