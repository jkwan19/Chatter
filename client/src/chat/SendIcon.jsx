import {
  Button,
  Grid
} from "@material-ui/core";

import Icon from '@material-ui/core/Icon';

export default function SendIcon(props) {

  const { handleSend } = props;

  return (
    <Grid
      item container xs={2}
      justify='space-evenly'
      >
      <Button
        onClick={handleSend}
        >
        <Icon>circle</Icon>
      </Button>
    </Grid>
  )
}