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
    margin: theme.spacing(2, 1)
  },
  inputRoot: {
    color: 'inherit',
  },
  messageInput: {
    paddingLeft: theme.spacing(3),
    justify: 'center'
  },
  messageButtons: {
    display: 'flex',
    marginLeft: 'auto',
    alignItems: 'center',
    paddingRight: theme.spacing(3)
  }
}));

export default function Compose () {
  const classes = useStyles();
  return (
    <Grid
      container
      className={classes.composeBox}
      direction="row"
      >
      <Grid
        item container xs={8}
        alignItems="center"
        className={classes.messageInput}>
          <InputBase
            placeholder="Type Something..."
            classes={{
              root: classes.inputRoot,
            }}
            inputProps={{ 'aria-label': 'text' }}
          />
      </Grid>
      <Grid
        item container xs={4}
        justify="flex-end"
        alignItem="center"
        className={classes.messageButtons}
        >
          <SendIcon />
          <FilesIcon />
      </Grid>
    </Grid>
    )
}