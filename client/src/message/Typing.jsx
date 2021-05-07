import {
  Grid,
  Hidden,
  ListItem
} from "@material-ui/core";

import Picture from "../profile/Picture";
import Receipt from "./Receipt";
import Content from "./Content";
import TypingIcon from "./TypingIcon";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  friendBubble: {
    background: 'linear-gradient(-45deg, #6cc1ff 0%, #3a8dff 100%)',
    borderRadius: "0 10px 10px",
    marginLeft: '5px',
    minHeight: "6vh",
    justifyContent: "space-evenly",
    [theme.breakpoints.down("sm")]: {
      minHeight: "2.5vh",
    }
  },
  friendSection: {
    marginRight: "auto",
    width: "auto",
    alignContent: "center"
  },
  messageSection: {
    width: "auto",
  }
}));

export default function Typing({
  timeStamp,
  recipient,
  isTyping
  }) {
  const classes = useStyles();

  return(
    <ListItem >
      <Grid
        container
        spacing={2}
        className={classes.friendSection}
        >
          <Grid
            item
            >
            <Hidden smDown>
              <Picture
                name={recipient.username}
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
              name={recipient.username}
              timeStamp={timeStamp}
              align="left"
              />
            <Grid
              item container xs={12} sm={10}
              className={classes.friendBubble}
              >
              <TypingIcon />
            </Grid>
          </Grid>
      </Grid>
    </ListItem>

  )
}