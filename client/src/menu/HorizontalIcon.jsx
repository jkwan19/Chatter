import {
  IconButton
} from "@material-ui/core";

import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  menuIcon: {
    color: '#95A7C4'
  }
}));

export default function HorizontalIcon (props) {

  const classes = useStyles();
  const { handleClick } = props;

  return (
    <IconButton
    aria-label="more"
    aria-controls="long-menu"
    aria-haspopup="true"
    className={classes.menuIcon}
    onClick={handleClick}
    >
      <MoreHorizIcon />
    </IconButton>
  )
}