import React from 'react';

/* MATERIAL UI STYLING */
import {
  Box,
  Button,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  submit: {
    margin: theme.spacing(3, 2, 2),
    padding: 10,
    width: 160,
    height: 56,
    borderRadius: 3,
    marginTop: 49,
    fontSize: 16,
    fontWeight: 600,
    backgroundColor: "#3a8dff"
  },
}));

export default function SubmitButton(props) {
  const classes = useStyles();

  return (
    <Box textAlign="center">
      <Button
        type="submit"
        size="large"
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        <Typography variant="body2">{props.name}</Typography>
      </Button>
    </Box>
  )
}