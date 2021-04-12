import {
  Badge,
  Grid
} from "@material-ui/core"

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  notification:{
    backgroundColor: '#3F92FF',
    padding: "0px 8px 4px",
    color: "#FFF",
    fontSize: ".625rem",
    fontWeight: 600,
    [theme.breakpoints.down("sm")]: {
      fontSize: '.1rem'
    }
  }
}));

export default function UnreadNotification ({ numUnread }) {

  const classes = useStyles();

  return (
    <Grid
      item xs={12} sm={12} md={1} lg={1}
      >
      <Badge
        badgeContent={numUnread}
        variant="standard"
        classes={{ badge: classes.notification }}
      />
    </Grid>
  )
}