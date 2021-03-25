import React from "react";
import { Link } from "react-router-dom";

/* MATERIAL UI STYLING */
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

/* COMPONENTS */
import AccountButton from './AccountButton';
import NoAccountButton from './NoAccountButton';

const useStyles = makeStyles(theme => ({
  link: {
    textDecoration: "none",
    display: "flex",
    flexWrap: "nowrap",
  },
}));


export default function AccountNavButtons(props) {
  const classes = useStyles();

  return (
    <Grid container justify="flex-end">
      <Link to={props.link} className={classes.link}>
        <NoAccountButton value={props.alt} />
        <AccountButton value={props.main} />
      </Link>
    </Grid>
  )
}