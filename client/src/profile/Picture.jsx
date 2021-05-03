import {
  Avatar,
  Grid
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    [theme.breakpoints.down("sm")]:{
      width: '3vh',
      height: '3vh'
    }
  },
  seen: {
    width: theme.spacing(2),
    height: theme.spacing(2),
    marginLeft: 'auto'
  }
}));

export default function Picture({ name, type }) {

  const classes = useStyles();

  return (
    <Grid
      item xs={12} sm={12} md={2}
      >
      <Avatar
        src={`/images/${name}.png`}
        className={classes[type]}
        id={name}
        />
    </Grid>

  )
}