import {
  Badge,
  Box,
  Grid,
  Typography
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import HorizontalIcon from "../menu/HorizontalIcon";

const useStyles = makeStyles(theme => ({
  headerBox: {
    padding: theme.spacing(3),
    borderRadius: '0 5px',
    width: '100%',
    alignContent: 'center',
    [theme.breakpoints.down("sm")]: {
      height: '7vh',
    }
  },
  horizIcon: {
    marginLeft: 'auto'
  },
  chatStatus: {
    paddingLeft: '20px',
    paddingTop: '5px'
  },
  statusText: {
    paddingLeft: theme.spacing(2)
  }
}));

export default function MessageHeader ({
  name,
  userId,
  onlineUsers
}) {

  const classes = useStyles();

  const header = name;

  const isOnline = onlineUsers[userId] ? true : false;

  if (!name) {
    return (
      <Box
      container
      component={Grid}
      className={classes.headerBox}
      boxShadow={1}
      ></Box>
    )
  }
  return (
    <Box
      container
      component={Grid}
      className={classes.headerBox}
      boxShadow={1}
      >
      <Typography variant="h5">{header}</Typography>
      <Grid item className={classes.chatStatus}>
        <Badge
          color={isOnline ? "secondary" : "primary"}
          overlap="circle"
          variant="dot"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          >
          <Grid
            container
            className={classes.statusText}
            >
            <Typography
              variant="subtitle1"
              >
              {isOnline ? "Online" : "Offline"}
            </Typography>
          </Grid>
        </Badge>
      </Grid>
      <Grid
        item
        className={classes.horizIcon}
        >
          <HorizontalIcon />
      </Grid>
    </Box>

  )
}