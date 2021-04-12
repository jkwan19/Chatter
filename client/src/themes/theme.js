import { createMuiTheme } from '@material-ui/core/styles';

const defaultTheme = createMuiTheme({
  typography: {
    fontFamily: `'Open Sans', sans-serif`,
    fontSize: 12,
    button: {
      textTransform: 'none'
    },
  },
  span: {
    allVariants: {
      color: '#000'
    }
  },
  palette: {
    primary: {
      main: "#D0DAE9"
    },
    secondary: {
      main: "#1CED84"
    },
    text: {
      primary: "#FFF",
      secondary: "#91A3C0",
      default: "#000"
    }
  }
});

const { breakpoints } = defaultTheme;

export const theme = {
  ...defaultTheme,
  overrides: {
    MuiTypography: {
      h1: {
        fontWeight: '600',
        fontSize: '1.625rem',
        [breakpoints.down("sm")]: {
          fontSize: ".75rem"
        },
      },
      h4: {
        fontWeight: '500',
        fontSize: '1.625rem',
        color: "#000",
        [breakpoints.down("sm")]: {
          fontSize: ".75rem"
        }
      },
      h5: {
        fontSize: '1.25rem',
        fontWeight: '500',
        [breakpoints.down("sm")]: {
          fontSize: ".5rem"
        },
      },
      h6: {
        fontWeight: '500',
        fontSize: ".875rem",
        [breakpoints.down("sm")]: {
          fontSize: ".365rem"
        }
      },
      body1: {
        fontSize: ".875rem",
        [breakpoints.down("sm")]: {
          fontSize: ".25rem"
        },
      },
      body2: {
        fontSize: '.875rem',
        [breakpoints.down("sm")]: {
          fontSize: ".25rem"
        },
      },
      subtitle1: {
        fontWeight: '600',
        fontSize: ".75rem",
        color: '#BFC9DB',
        [breakpoints.down("sm")]: {
          fontSize: ".25rem"
        },
      },
      subtitle2: {
        fontSize: '.75rem',
        [breakpoints.down("sm")]: {
          fontSize: ".15rem"
        },
      },
      caption: {
        fontSize: '.688rem',
        color: '#BECCE2',
        [breakpoints.down("sm")]: {
          fontSize: ".25rem"
        },
      },
    },
    MuiAvatar: {
      root: {
        [breakpoints.down("sm")]: {
          height: '3vh',
          width: '3vh'
        }
      }
    },
    MuiInputBase: {
      input: {
        fontSize: '.75rem',
        [breakpoints.down("sm")]: {
          fontSize: '.25rem'
        }
      }
    },
    MuiBadge: {
      badge: {
        [breakpoints.down("sm")]: {
          height: '.25rem',
          width: '.25rem',
          minWidth: '.25rem'
        }
      },
      dot: {
        [breakpoints.down("sm")]: {
          height: '.25rem',
          minWidth: '.25rem'
        }
      }
    },
    MuiIcon: {
      root: {
        [breakpoints.down("sm")]: {
          fontSize: '.75rem'
        }
      }
    },
    MuiSvgIcon: {
      root: {
        [breakpoints.down("sm")]: {
          fontSize: '.75rem'
        }
      }
    }
  }
}

