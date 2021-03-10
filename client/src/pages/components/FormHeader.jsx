import React from "react";

/* MATERIAL UI STYLING */
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

/* COMPONENTS */
import AccountButton from './AccountButton';
import NoAccountButton from './NoAccountButton';

const useStyles = makeStyles(theme => ({
  welcome: {
    fontSize: 26,
    paddingBottom: 20,
    color: "#000000",
    fontWeight: 700,
    fontFamily: "'Open Sans'"
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