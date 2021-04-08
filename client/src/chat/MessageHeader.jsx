import {
  Badge,
  Grid,
  Paper,
  Typography
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import HorizontalIcon from "../menu/HorizontalIcon";

const useStyles = makeStyles(theme => ({
  headerBox: {
    height: '11vh',
    width: '100%',
    zIndex: 2,
  },
  horizIcon: {
    display: 'flex',
    marginLeft: 'auto'
  },
  chatUser: {
    padding: theme.spacing(3),
  },
  chatStatus: {
    paddingLeft: '20px',
    paddingTop: '5px'
  },
  statusText: {
    paddingLeft: theme.spacing(2)
  }
}));

export default function MessageHeader ({ name, status }) {

  const classes = useStyles();

  return (
    <Grid
      container
      component={Paper}
      className={classes.headerBox}
      direction="row"
      >
      <Grid
        item container
        className={classes.chatUser}
        direction="row"
        >
        <Typography variant="h5">{name}</Typography>
        <Grid item className={classes.chatStatus}>
          <Badge
            color={status ? "secondary" : "primary"}
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
                {status ? "Online" : "Offline"}
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
      </Grid>
    </Grid>
  )
}