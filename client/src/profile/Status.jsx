import React from 'react';

/* MATERIAL UI STYLING */
import {
  Grid,
  Badge
} from "@material-ui/core";

import Picture from "./Picture";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
}));

export default function Status(props) {
  const classes = useStyles();
  const { name, status } = props;
  const badgeColor = status ? "secondary" : "primary";

  return (
    <Grid
      item
    >
      <Badge
        color={badgeColor}
        overlap="circle"
        badgeContent=" "
        variant="dot"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        className={classes.badge}
        >
          <Picture
            name={name}
            type="default"
            />
      </Badge>
    </Grid>
  )
}