import React from "react";

/* MATERIAL UI STYLING */
import {
  Grid,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles(theme => ({
  welcome: {
    flexGrow: 1,
    width: "100%",
    paddingBottom: 20,
    color: "#000000",
  },
}));


export default function FormHeader(props) {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs>
        <Typography
          className={classes.welcome}
          component="h1"
          variant="h5"
        >
          {props.value}
        </Typography>
      </Grid>
    </Grid>
  )
}