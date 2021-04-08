import React from "react";

/* MATERIAL UI STYLING */
import {
  IconButton,
  Snackbar
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

export default function ErrorMessage({ open, message, handleClose}) {

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center"
      }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      message={message}
      action={
        <React.Fragment>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      }
    />
  )
}