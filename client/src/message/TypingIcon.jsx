import {
  Grid
} from "@material-ui/core";

import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  typingContainer: {
    maxHeight: '2.5vh',
    maxWidth: '2vh',
    paddingTop: '6px',
    justifyContent: "center",
    alignContent: "center"
  },
  typingIcon: {
    color: '#FFF',
    opacity: '0.304',
    fontSize: '3rem',
    [theme.breakpoints.down("sm")]: {
      fontSize: '1.5rem'
    }
  }
}));
export default function TypingIcon() {

  const classes = useStyles();

  return (
    <Grid
      container
      className={classes.typingContainer}
      >
      <MoreHorizIcon
        className={classes.typingIcon}
        fontSize='default'
        />
    </Grid>
  )
}
