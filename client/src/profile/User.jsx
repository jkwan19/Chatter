import {
  Grid,
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
  }
}));
export default function User ({ index, message, name, numUnread, isOnline, isRead, isTyping, handleChat}) {

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
        >
        <Grid
          item container
          direction="column"
          style={{padding: '10px 20px'}}
          >
          <Name name={name} />
          {preview}
        </Grid>
      </Grid>
      <UnreadNotification numUnread={numUnread} />
    </ListItem>
  )
}