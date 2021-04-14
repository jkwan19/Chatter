import React from "react";

import {
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  label: {
    color: "rgb(0,0,0,0.4)",
    paddingLeft: "5px",
  },
}))

export default function Label ({ name }) {

  const classes = useStyles();

  return (
    <Typography className={classes.label}>
      {name}
    </Typography>
  )
}