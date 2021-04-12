import React from "react";

import {
  TextField
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Label from "./Label";

const useStyles = makeStyles(theme => ({
  label: {
    color: "rgb(0,0,0,0.4)",
    paddingLeft: "5px"
  },
  inputs: {
    marginTop: ".8rem",
    height: "2rem",
    padding: "5px",
    color: "#000"
  },
}))

export default function EmailField ({ handleChange, errors, touched, values, page }) {

  const classes = useStyles();

  return (
    <TextField
      id="email"
      label={
        <Label name="E-mail address" />
      }
      fullWidth
      margin="normal"
      InputLabelProps={{
        shrink: true
      }}
      InputProps={{ classes: { input: classes.inputs } }}
      name="email"
      autoComplete="email"
      autoFocus={page === "Signup" ? false : true}
      helperText={touched.email ? errors.email : ""}
      error={touched.email && Boolean(errors.email)}
      value={values.email}
      onChange={handleChange}
    />
  )
}