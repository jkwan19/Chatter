import {
  Badge,
  Grid,
  Paper,
  Typography
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import HorizontalIcon from "../menu/HorizontalIcon";

const useStyles = makeStyles(theme => ({
  headerBox: {
    height: '11vh',
    width: '100%',
  },
  horizIcon: {
    display: 'flex',
    marginLeft: 'auto'
  },
  chatUser: {
    padding: theme.spacing(3),
  },
  chatStatus: {
    paddingLeft: '20px',
    paddingTop: '5px'
  },
  statusText: {
    paddingLeft: theme.spacing(2)
  }
}));

export default function MessageHeader (props) {

  const classes = useStyles();

  const { name } = props;

  return (
    <Grid
      container
      component={Paper}
      square
      className={classes.headerBox}
      direction="row"
      >
      <Grid
        item container
        className={classes.chatUser}
        direction="row"
        >
        <Typography variant="h5">{name}</Typography>
        <Grid item className={classes.chatStatus}>
          <Badge
            color="secondary"
            overlap="circle"
            badgeContent=" "
            variant="dot"
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            >
            <Grid
              container
              className={classes.statusText}
              >
              <Typography
                variant="subtitle1"

                >
                Online
              </Typography>
            </Grid>
          </Badge>
        </Grid>
        <Grid
          item
          className={classes.horizIcon}
          >
           <HorizontalIcon />
        </Grid>
      </Grid>
    </Grid>
  )
}