import {
  Grid,
  Typography
} from "@material-ui/core";

export default function Receipt({ align, name, timeStamp }) {

  return(
    <Grid
      item xs={12}
      align={align}
      style={{paddingBottom: '8px'}}
      >
        <Typography
          variant="caption"
          >
          {name} {timeStamp}
          </Typography>
    </Grid>
  )
}