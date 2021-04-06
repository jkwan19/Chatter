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
    minHeight: "5.5vh"
  },
  userSection: {
    marginLeft: "auto",
    width: "auto",
  },
  messageSection: {
    width: "auto"

}));

export default function Message(props) {
  const classes = useStyles();

  const { media, message, name, timeStamp, isReceived, isSeen } = props;

  const messageSeen = () => {
    if (isSeen) {
      return (
        <Picture
          name='santiago'
          type="seen"
          />
      )
    }
  }

  const body = () => {
    return (
      media
        ?
        <Media media={media} />
        :
        <Grid
          item container xs={12}
          className={classes.userBubble}
          direction="column"
          >
          <Content
            message={message}
            color="textSecondary"
            type="user"
            />
        </Grid>
    )
  }

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
        {body()}
        {messageSeen()}
      </Grid>
    </Grid>
  )
}