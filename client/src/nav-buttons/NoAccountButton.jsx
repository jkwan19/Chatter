import React from "react";

/* MATERIAL UI STYLING */
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  noAccBtn: {
    fontSize: 14,
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
    <Grid
      className={classes.noAccBtn}
      variant="inherit"
      >
      {props.value}
    </Grid>
  )
}