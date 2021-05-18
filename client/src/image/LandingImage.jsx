import React from 'react';

/* MATERIAL UI STYLING */
import {
  Grid,
  Typography,
  Hidden
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  image: {
    backgroundImage: "url(./images/bg-img.png)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center top",
    width: "100%",
  },
  icon: {
    [theme.breakpoints.down("sm")]: {
      width: '40px',
      marginTop: theme.spacing(3)
    }
  },
  overlay: {
    backgroundImage:
      "linear-gradient(180deg, rgb(58,141,255, 0.75) 0%, rgb(134,185,255, 0.75) 85%)",
    minHeight: "100%",
  },
  heroText: {
    fontSize: '1.625rem',
    textAlign: "center",
    color: "white",
    marginTop: 30,
    maxWidth: 300,
    paddingBottom: theme.spacing(10),
    [theme.breakpoints.down("sm")]: {
      fontSize: '1rem',
      paddingBottom: theme.spacing(5)
    }
  },
}));

export default function LandingImage() {
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={4} md={5} className={classes.image}>
      <Grid
        className={classes.overlay}
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Hidden smDown>
        <img
          width={67} alt="chat bubble"
          className={classes.icon}
          src={process.env.PUBLIC_URL + '/images/chatBubble.png'}
          />
          <Typography className={classes.heroText}>
            Converse with anyone with any language
          </Typography>
        </Hidden>
      </Grid>
    </Grid>
  )
}

