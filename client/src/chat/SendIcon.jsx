import {
  Button,
  Grid
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  send: {
  }
}));

export default function SendIcon() {
  const classes = useStyles();

  return (
    <Grid
      item xs={2}
      className={classes.send}
      onClick={() => console.log('send message')}
      >
      <Button>
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22">
          <path id="ic-smiles" d="M0,11A11,11,0,1,1,11,22,11,11,0,0,1,0,11Z" fill="#d1d9e6"/>
        </svg>
      </Button>
    </Grid>
  )
}