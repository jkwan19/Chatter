import {
  Badge,
  Grid
} from "@material-ui/core"

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  bubble:{
    marginLeft: "auto"
  },
  notification:{
    backgroundColor: '#3F92FF',
    padding: "0px 8px 4px",
    color: "#FFF",
    fontSize: "10px",
    fontWeight: 600
  }
}));

export default function UnreadNotification ({ numUnread }) {

  const classes = useStyles();

  return (
    <Grid
      item container xs={1}
      alignContent="center"
      className={classes.bubble}
      >
      <Badge
        badgeContent={numUnread}
        variant="standard"
        classes={{ badge: classes.notification }}
      />
    </Grid>
  )
}