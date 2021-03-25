import React from 'react';

/* MATERIAL UI STYLING */
import {
  Badge,
  Avatar
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

export default function Status(props) {
  const classes = useStyles();
  const name = props.name;

  return (
    <Badge
      color="primary"
      overlap="circle"
      badgeContent=" "
      variant="dot"
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      className={classes.badge}
      >
        <Avatar
          src={`/images/${name}.png`}className={classes.large}/>
    </Badge>
  )
}