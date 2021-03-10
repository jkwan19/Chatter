import React from "react";

/* MATERIAL UI STYLING */
import Button from "@material-ui/core/Button";
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
    marginRight: 35
  },
}));

export default function AccountButton(props) {
  const classes = useStyles();

  return (
    <Button
      color="inherit"
      className={classes.accBtn}
      variant="contained"
    >
      {props.value}
    </Button>
  )
}