import {
  Button,
  Grid
} from "@material-ui/core";

import Icon from '@material-ui/core/Icon';

export default function SendIcon({ handleSend }) {

  return (
    <Grid
      item container xs={6}
      >
      <Button
        onClick={handleSend}
        >
        <Icon>circle</Icon>
      </Button>
    </Grid>
  )
}