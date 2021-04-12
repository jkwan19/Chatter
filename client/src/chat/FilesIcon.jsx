import {
  Button,
  Grid
} from "@material-ui/core";

import SvgIcon from '@material-ui/core/SvgIcon';

export default function FilesIcon() {

  return (
    <Grid
      item container xs={6}
      >
      <Button onClick={() => console.log('upload media')}>
        <SvgIcon>
          <path d="M5.684,20.842A1.9,1.9,0,0,1,3.79,18.948V5.684A1.9,1.9,0,0,1,5.684,3.79H16.106A1.9,1.9,0,0,1,18,5.684V18.948a1.9,1.9,0,0,1-1.894,1.895ZM0,15.158V1.895A1.9,1.9,0,0,1,1.895,0H13.263V1.895H1.895V15.158Z"/>
        </SvgIcon>
      </Button>
    </Grid>
  )
}