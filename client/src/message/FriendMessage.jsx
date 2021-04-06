import {
  Grid
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
    width: "auto",
    minHeight: "5.5vh"
  },
  friendSection: {
    marginRight: "auto",
    width: "auto",
  },
  messageSection: {
    width: "auto"
  }
}));

export default function Message(props) {
  const classes = useStyles();

  const { timeStamp, media, message, isReceived, isTyping } = props;

  const body = () => {
    return (
      media
        ?
        <Media media={media} />
        :
        <Content
          message={message}
          color="textPrimary"
          isTyping={isTyping}
          type="friend"
          />
    )
  }

  return(
    <Grid
      container
      direction="row"
      alignItems="center"
      spacing={2}
      className={classes.friendSection}
      >
        <Grid
          item
          >
          <Picture
            name="santiago"
            type="small"
            />
        </Grid>
        <Grid
          item container
          spacing={1}
          className={classes.messageSection}
          >
          <Receipt
            name="santiago"
            timeStamp={timeStamp}
            align="left"
            />
          <Grid
            item container xs={10}
            justify="center"
            className={classes.friendBubble}
            >
            {body()}
          </Grid>
        </Grid>
    </Grid>

  )
}