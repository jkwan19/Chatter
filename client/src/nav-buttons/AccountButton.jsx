import React from "react";

/* MATERIAL UI STYLING */
import {
  Box,
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
    flexDirection: "column",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
}));

export default function AccountButton(props) {
  const classes = useStyles();

  return (
    <Box
      className={classes.accBtn}
      >
      <Typography variant="body2">{props.value}</Typography>
    </Box>
  )
}