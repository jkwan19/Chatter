import {
  Grid,
  Typography
} from "@material-ui/core";

export default function Name (props) {

  const { name } = props;
  return (

    <Grid item>
      <Typography>{name}</Typography>
    </Grid>
    )
}