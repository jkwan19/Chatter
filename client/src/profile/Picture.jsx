import {
  Avatar,
  Grid
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  seen: {
    width: theme.spacing(2),
    height: theme.spacing(2),
    marginLeft: 'auto'
  }
}));

export default function Picture(props) {

  const classes = useStyles();
  const { name, type } = props;

  return (
    <Grid
      item
      >
      <Avatar
        src={process.env.PUBLIC_URL + `/images/${name}.png`}
        className={classes[type]}
        id={name}
        />
    </Grid>

  )
}