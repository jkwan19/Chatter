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
    color: "#000"
  },
  forgot: {
    paddingRight: 10,
    color: "#3a8dff",
    fontWeight: 400,
    fontSize: 12
  },
}))

export default function PasswordField ({ handleChange, errors, touched, values, page }) {

  const classes = useStyles();

  const inputProps = page === "Login" ? (
    <Typography className={classes.forgot}>
      Forgot?
    </Typography>
  ) : "";

  return (
    <TextField
      id="password"
      label={
        <Label name="Password" />
      }
      fullWidth
      margin="normal"
      InputLabelProps={{
        shrink: true
      }}
      InputProps={{
        classes: {
          input: classes.inputs
        },
        endAdornment: inputProps
      }}
      size="medium"
      type="password"
      autoComplete="current-password"
      helperText={touched.password ? errors.password : ""}
      error={touched.password && Boolean(errors.password)}
      value={values.password}
      onChange={handleChange}
    />
  )
}