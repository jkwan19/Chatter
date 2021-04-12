import React from "react";

/* MATERIAL UI STYLING */
import {
  Button,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  noAccBtn: {
    color: "#b0b0b0",
    fontWeight: 400,
    textAlign: "center",
    marginRight: 21,
  },
}));

export default function NoAccountButton({ value }) {
  const classes = useStyles();

  return (
    <Button
      className={classes.noAccBtn}
      >
      <Typography variant="body2">{value}</Typography>
    </Button>
  )
}