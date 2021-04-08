import React from 'react';

/* MATERIAL UI STYLING */
import {
  Grid,
  Badge
} from "@material-ui/core";

import Picture from "./Picture";

export default function Status(props) {

  const { name, status } = props;
  const badgeColor = status ? "secondary" : "primary";

  return (
    <Grid
      item
    >
      <Badge
        color={badgeColor}
        overlap="circle"
        variant="dot"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        >
          <Picture
            name={name}
            type="default"
            />
      </Badge>
    </Grid>
  )
}