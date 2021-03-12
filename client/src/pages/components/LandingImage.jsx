import React from 'react';

/* MATERIAL UI STYLING */
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Hidden from "@material-ui/core/Hidden";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  image: {
    backgroundImage: "url(./images/bg-img.png)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  overlay: {
    backgroundImage:
      "linear-gradient(180deg, rgb(58,141,255, 0.75) 0%, rgb(134,185,255, 0.75) 85%)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    flexDirection: "column",
    minHeight: "100vh",
    paddingBottom: 145,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  heroText: {
    fontSize: 26,
    textAlign: "center",
    color: "white",
    marginTop: 30,
    maxWidth: 300
  },
}));

export default function LandingImage() {
  const classes = useStyles();

  return (
    <Grid item xs={false} sm={4} md={5} className={classes.image}>
      <Box className={classes.overlay}>
        <Hidden xsDown>
          <img width={67} alt="chat bubble" src="/images/chatBubble.png" />
          <Hidden smDown>
            <p className={classes.heroText}>
              Converse with anyone with any language
            </p>
          </Hidden>
        </Hidden>
      </Box>
    </Grid>
  )
}

