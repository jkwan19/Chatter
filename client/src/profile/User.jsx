import {
  Grid,
  Hidden,
  ListItem,
  Typography
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import Name from "./Name";
import Status from "./Status";
import UnreadNotification from "../notification/UnreadNotification";

const useStyles = makeStyles(theme => ({
  chatUser: {
    padding: theme.spacing(2),
    margin: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(3, 0),
      margin: theme.spacing(0)
    }
  },
}));
export default function User (
  { index,
    message,
    name,
    numUnread,
    isOnline,
    isRead,
    isTyping,
    handleChat})
  {

  const classes = useStyles();

  if (isRead) {
    numUnread = 0
  }

  let preview = isTyping
                  ?
                  <Typography
                    variant="subtitle2"
                    style={{
                      fontStyle: 'italic',
                      color: '#94A6C4'
                      }}>
                      Typing...
                  </Typography>
                  :
                  <Typography
                    variant="subtitle2"
                    style={{
                      fontWeight: 500,
                      color: isRead ? "#94A6C4" : "#000"
                      }}>
                    {message}
                  </Typography>;

  return (
    <ListItem
      button
      className={classes.chatUser}
      id={index}
      onClick={handleChat}
      >
      <Status name={name} status={isOnline}/>
      <Grid
        container
        spacing={1}
        >
        <Grid
          item xs={12} sm={12} md={11} lg={11} xl={11}
          style={{padding: '10px 20px'}}
          >
          <Name name={name} />
          <Hidden smDown>
            {preview}
          </Hidden>
        </Grid>
      </Grid>
      <Hidden smDown>
        <UnreadNotification numUnread={numUnread} />
      </Hidden>
    </ListItem>
  )
}