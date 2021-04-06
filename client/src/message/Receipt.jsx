import {
  Grid,
  Typography
} from "@material-ui/core";

export default function Receipt(props) {

  const { align, name, timeStamp } = props;

  return(
    <Grid
      item xs={12}
      align={align}
      style={{paddingBottom: '10px'}}
      >
        <Typography
          variant="caption"
          >
          {name} {timeStamp}
          </Typography>
    </Grid>
  )
}