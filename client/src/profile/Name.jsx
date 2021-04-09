import {
  Grid,
  Typography
} from "@material-ui/core";

export default function Name ({ name }) {

  return (
    <Grid item xs={4}>
      <Typography>{name}</Typography>
    </Grid>
    )
}