import {
  CardMedia,
  Grid
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  media: {
    height: '18vh',
    width: '18vh',
    borderRadius: "10px 10px 0",
    [theme.breakpoints.down("sm")]: {
      width: '9vh',
      height: '9vh'
    }
  },
}));

export default function Media({ media }) {

  const classes = useStyles();

  return(
    <Grid
      item container xs={12}
      justify="flex-end"
    >
      <CardMedia image={media} className={classes.media}/>
    </Grid>
  )
}