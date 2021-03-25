import React from "react";

import {
  TextField,
  Typography
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
  },
}))

export default function EmailField (props) {
  const classes = useStyles();

  const { handleChange, errors, touched, values, page } = props;

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