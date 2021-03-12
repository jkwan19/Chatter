import React from "react";

/* MATERIAL UI STYLING */
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  noAccBtn: {
    fontSize: 14,
    color: "#b0b0b0",
    fontWeight: 400,
    textAlign: "center",
    marginRight: 21,
    whiteSpace: "nowrap"
  },
}));

export default function NoAccountButton(props) {
  const classes = useStyles();

  return (
    <Button className={classes.noAccBtn}>
      {props.value}
    </Button>
  )
}