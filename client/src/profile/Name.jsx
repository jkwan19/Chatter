import {
  Grid,
  Typography
} from "@material-ui/core";


export default function Name ({ name }) {

  return (
    <Grid item container xs={6} sm={6} md={6}
    >
      <Typography variant='h6'>{name}</Typography>
    </Grid>
    )
}