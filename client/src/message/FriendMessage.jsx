import {
  Grid,
  Hidden
} from "@material-ui/core";

import Receipt from "./Receipt";
import Content from "./Content";
import Media from "./Media";
import Picture from "../profile/Picture";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  friendBubble: {
    background: 'linear-gradient(-45deg, #6cc1ff 0%, #3a8dff 100%)',
    borderRadius: "0 10px 10px",
    minHeight: "4.5vh",
    [theme.breakpoints.down("sm")]: {
      minHeight: "2.5vh",
    }
  },
  friendSection: {
    marginRight: "auto",
    width: "auto",
  },
  messageSection: {
    width: "auto"
  }
}));

export default function Message({
  timeStamp,
  media,
  message,
  recipient,
  isReceived,
  isTyping
  }) {
  const classes = useStyles();

  const body = media
                  ?
                  <Media media={media} />
                  :
                  <Content
                    message={message}
                    color="textPrimary"
                    isTyping={isTyping}
                    type="friend"
                    />;


  return(
    <Grid
      container
      alignItems="center"
      spacing={2}
      className={classes.friendSection}
      >
        <Grid
          item
          >
          <Hidden smDown>
            <Picture
              name={recipient.name}
              type="small"
              />
          </Hidden>
        </Grid>
        <Grid
          item container
          spacing={1}
          className={classes.messageSection}
          >
          <Receipt
            name={recipient.name}
            timeStamp={timeStamp}
            align="left"
            />
          <Grid
            item container xs={12} sm={12}
            justify="center"
            className={classes.friendBubble}
            >
            {body}
          </Grid>
        </Grid>
    </Grid>

  )
}