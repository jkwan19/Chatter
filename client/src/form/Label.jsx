import React from "react";

import {
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  label: {
    fontSize: 14,
    color: "rgb(0,0,0,0.4)",
    paddingLeft: "5px"
  },
}))

export default function Label (props) {
  const classes = useStyles();
  const name = props.name;

  return (
    <Typography className={classes.label}>
      {name}
    </Typography>
  )
}