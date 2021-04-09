import {
  Typography
} from "@material-ui/core";

import TypingIcon from "./TypingIcon";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  friend: {
    paddingRight: theme.spacing(2),
  },
  user:{
    paddingLeft: theme.spacing(2),
  }
}));

export default function Content({ color, message, type, isReceived, isTyping }) {
  const classes = useStyles();

  if (isTyping) {
    return (
      <TypingIcon />
    )
  }

  return (
    <Typography
      color={color}
      variant="body2"
      className={classes[type]}
      >
        {message}
      </Typography>
  )
}