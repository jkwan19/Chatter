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

export default function UsernameField ({ handleChange, errors, touched, values}) {
  const classes = useStyles();

  return (
    <TextField
      id="username"
      label={
        <Label name="Username" />
      }
      fullWidth
      margin="normal"
      InputLabelProps={{
        shrink: true
      }}
      InputProps={{ classes: { input: classes.inputs } }}
      name="username"
      autoComplete="username"
      autoFocus
      helperText={touched.username ? errors.username : ""}
      error={touched.username && Boolean(errors.username)}
      value={values.username}
      onChange={handleChange}
    />
  )
}