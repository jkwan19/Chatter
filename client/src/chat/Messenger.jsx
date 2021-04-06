import {
  Grid,
  List,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import Compose from "../chat/Compose";
import Message from "../message/Message";

const useStyles = makeStyles(theme => ({
  messenger: {
    margin: theme.spacing(0, 2),
    padding: theme.spacing(0, 2),
  },
  messageList:{
    paddingBottom: theme.spacing(1)
  },
  media: {
    minHeight: '70px',
    minWidth: '70px',
    height: "auto",
    width: "auto",
    margin: "10px"
  },
  friendSection: {
    marginRight: "auto",
    width: "auto",
    height: "14vh"
  },
  friendBubble: {
    backgroundColor: '#6CC1FF',
    borderRadius: "0 5px 5px",
    paddingTop: "4px"
  },
  userBubble:{
    backgroundColor: '#F4F6FA',
    borderRadius: "5px 5px 0",
    paddingTop: "4px"
  },
  userSection: {
    marginLeft: "auto",
    width: "auto",
    height: "14vh"
  },
}));

export default function Messenger () {
  const classes = useStyles();

  return (
    <Grid
      item xs={12}
      className={classes.messenger}
      >
      <List>
        <Grid
          item
          className={classes.messageList}>
          <Message
            timeStamp="10:45"
            message="Where are you from?"
            isReceived={true}
          />
          <Message
            timeStamp="10:51"
            message="I'm from New York"
            isReceived={false}
          />
          <Message
            timeStamp="10:55"
            message="Share photo of your city, please"
            isReceived={true}
          />
          <Message
            timeStamp="10:58"
            media={process.env.PUBLIC_URL + `/images/sentImg.png`}
            isReceived={false}
            isSeen={true}
          />
          <Message
            isReceived={true}
            isTyping={true}
            />
        </Grid>
        <Compose />
      </List>
    </Grid>
  )
}