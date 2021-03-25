import React from "react";

/* MATERIAL UI STYLING */
import {
  IconButton,
  Snackbar
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

export default function ErrorMessage(props) {
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