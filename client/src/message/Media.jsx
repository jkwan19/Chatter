import {
  CardMedia,
  Grid
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  media: {
    minHeight: '18vh',
    minWidth: '18vh',
    borderRadius: "10px 10px 0",
  },
}));

export default function Media(props) {

  const classes = useStyles();

  const { media } = props;

  return(
    <Grid
      item container xs={12}
      justify="flex-end"
    >
      <CardMedia image={media} className={classes.media}/>
    </Grid>
  )
}