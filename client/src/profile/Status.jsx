import React from 'react';

/* MATERIAL UI STYLING */
import {
  Grid,
  Badge
} from "@material-ui/core";

import Picture from "./Picture";

export default function Status({ name, status }) {

  const badgeColor = status ? "secondary" : "primary";

  return (
    <Grid
      item xs={8} sm={8} md={2} lg={2} xl={2}
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