import {
  Grid,
  Typography
} from "@material-ui/core";


export default function Name ({ name }) {

  return (
    <Grid item xs={6} sm={6} md={2}>
      <Typography variant='h6'>{name}</Typography>
    </Grid>
    )
}