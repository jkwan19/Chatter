import React from "react";

/* MATERIAL UI STYLING */
import {
  Box,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  noAccBtn: {
    color: "#b0b0b0",
    fontWeight: 400,
    textAlign: "center",
    marginRight: 21,
    whiteSpace: "nowrap",
    flexDirection: "column",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
}));

export default function NoAccountButton(props) {
  const classes = useStyles();

  return (
    <Box
      className={classes.noAccBtn}
      >
      <Typography variant="body2">{props.value}</Typography>
    </Box>
  )
}