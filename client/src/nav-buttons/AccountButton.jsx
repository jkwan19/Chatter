import React from "react";

/* MATERIAL UI STYLING */
import {
  Button,
  Typography
 } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  accBtn: {
    width: 170,
    height: 54,
    borderRadius: 5,
    filter: "drop-shadow(0px 2px 6px rgba(74,106,149,0.2))",
    backgroundColor: "#ffffff",
    color: "#3a8dff",
    boxShadow: "none",
    marginRight: 35,
    [theme.breakpoints.down("sm")]: {
      height: 50,
      width: 140
    }
  },
}));

export default function AccountButton({ value }) {
  const classes = useStyles();

  return (
    <Button
      color="inherit"
      className={classes.accBtn}
      variant="contained"
      >
      <Typography variant="body2">{value}</Typography>
    </Button>
  )
}