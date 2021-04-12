import {
  Grid
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(theme => ({
  searchIcon:{
    [theme.breakpoints.down("sm")]:{
      height: '1vh',
      width: '1vh'
    }
  }
}));
export default function SearchIcon() {

  const classes = useStyles();

  return (
    <Grid item >
      <svg
        className={classes.searchIcon}
        xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">
        <path id="ic-search" d="M10.428,11.726,7.954,9.26a4.94,4.94,0,0,1-2.877.894,4.978,4.978,0,0,1-1.972-.4A4.974,4.974,0,0,1,.4,7.05a5.057,5.057,0,0,1,0-3.945A4.972,4.972,0,0,1,3.105.4,5.057,5.057,0,0,1,7.05.4a4.974,4.974,0,0,1,2.7,2.7,4.978,4.978,0,0,1,.4,1.972A4.94,4.94,0,0,1,9.26,7.954l2.473,2.474A.926.926,0,0,1,11.077,12,.855.855,0,0,1,10.428,11.726Z" fill="#b1c3df"/>
      </svg>
    </Grid>
  )

}