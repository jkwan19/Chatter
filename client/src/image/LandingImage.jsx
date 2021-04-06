import React from 'react';

/* MATERIAL UI STYLING */
import {
  Grid,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  image: {
    backgroundImage: "url(./images/bg-img.png)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center top",
    width: "100%"
  },
  overlay: {
    backgroundImage:
      "linear-gradient(180deg, rgb(58,141,255, 0.75) 0%, rgb(134,185,255, 0.75) 85%)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100%",
  },
  heroText: {
    fontSize: 26,
    textAlign: "center",
    color: "white",
    marginTop: 30,
    maxWidth: 300,
    paddingBottom: theme.spacing(10)
  },
}));

export default function LandingImage() {
  const classes = useStyles();

  return (
    <Grid item xs={false} sm={4} md={5} className={classes.image}>
      <Grid
        className={classes.overlay}
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <img width={67} alt="chat bubble" src={process.env.PUBLIC_URL + '/images/chatBubble.png'} />
          <Typography className={classes.heroText}>
            Converse with anyone with any language
          </Typography>
      </Grid>
    </Grid>
  )
}

