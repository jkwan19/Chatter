import {
  Grid,
  InputBase,
} from "@material-ui/core";

import SendIcon from "./SendIcon";
import FilesIcon from "./FilesIcon";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  composeBox: {
    backgroundColor: '#F4F6FA',
    borderRadius: '10px',
    width: '100%',
    minHeight:'10vh',
    margin: theme.spacing(2, 1),
    [theme.breakpoints.down("sm")]: {
      minHeight: '7vh'
    }
  },
  inputRoot: {
    color: 'inherit',
  },
  messageInput: {
    paddingLeft: theme.spacing(3),
    justify: 'center'
  },
  messageButtons: {
    marginLeft: 'auto',
    alignItems: 'center',
    paddingRight: theme.spacing(3),
    "& .MuiButton-label": {
      color: "#D1D9E6"
    }
  }
}));

export default function Compose ({ handleSend, handleMessage, newMessage }) {

  const classes = useStyles();

  return (
    <Grid
      container
      className={classes.composeBox}
      direction="row"
      >
      <Grid
        item container xs={10}
        className={classes.messageInput}
        >
          <InputBase
            placeholder="Type Something..."
            value={newMessage}
            classes={{
              root: classes.inputRoot,
            }}
            inputProps={{ 'aria-label': 'text' }}
            onChange={handleMessage}
          />
      </Grid>
      <Grid
        item container xs={2}
        alignContent="space-around"
        justify="space-evenly"
        className={classes.messageButtons}
        >
          <SendIcon
            handleSend={handleSend}
            />
          <FilesIcon />
      </Grid>
    </Grid>
    )
}