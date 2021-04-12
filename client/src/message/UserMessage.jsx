import {
  Grid
} from "@material-ui/core";

import Receipt from "./Receipt";
import Content from "./Content";
import Media from "./Media";
import Picture from "../profile/Picture";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  userBubble:{
    backgroundColor: '#F4F6FA',
    borderRadius: "10px 10px 0",
    minHeight: "7vh",
    overflow: 'auto',
    [theme.breakpoints.down("sm")]: {
      minHeight: "2.5vh"
    }
  },
  userSection: {
    marginLeft: "auto",
    width: "auto",
  },
  messageSection: {
    width: "auto",
  }
}));

export default function Message({
  media,
  message,
  name,
  recipient,
  timeStamp,
  isReceived,
  isSeen
  }) {

  const classes = useStyles();

  const messageSeen = () => {
    if (isSeen) {
      return (
        <Picture
          name={recipient.name}
          type="seen"
          />
      )
    }
  }

  const body = media
                  ?
                  <Media media={media} />
                  :
                  <Grid
                    item container xs={12} sm={12}
                    className={classes.userBubble}
                    >
                    <Content
                      message={message}
                      color="textSecondary"
                      type="user"
                      />
                  </Grid>

  return (
    <Grid
      container
      spacing={2}
      className={classes.userSection}
      >
      <Grid
        item container
        justify="flex-end"
        spacing={1}
        className={classes.messageSection}
        >
        <Receipt
          timeStamp={timeStamp}
          align="right"
          />
        {body}
        {messageSeen()}
      </Grid>
    </Grid>
  )
}