import {
  Button,
  Grid
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  files: {
  }
}));

export default function FilesIcon() {
  const classes = useStyles();

  return (
    <Grid
      item xs={2}
      className={classes.files}
      onClick={() => console.log('upload media')}
      >
      <Button>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="20.842" viewBox="0 0 18 20.842">
          <path id="ic-file" d="M5.684,20.842A1.9,1.9,0,0,1,3.79,18.948V5.684A1.9,1.9,0,0,1,5.684,3.79H16.106A1.9,1.9,0,0,1,18,5.684V18.948a1.9,1.9,0,0,1-1.894,1.895ZM0,15.158V1.895A1.9,1.9,0,0,1,1.895,0H13.263V1.895H1.895V15.158Z" fill="#d1d9e6"/>
        </svg>
      </Button>
    </Grid>
  )
}