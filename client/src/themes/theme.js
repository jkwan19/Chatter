import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  typography: {
    fontFamily: `'Open Sans', sans-serif`,
    fontSize: 14,
    h1: {
      fontWeight: '600',
      fontSize: 26,
    },
    h4: {
      fontWeight: '500',
      fontSize: 26,
      color: "#000"
    },
    h5: {
      fontWeight: '500',
      fontSize: 20,
      color: "#000"
    },
    h6: {
      fontWeight: '500',
      fontSize: 16
    },
    button: {
      textTransform: 'none'
    },
    subtitle1: {
      fontWeight: '600',
      fontSize: 12,
      color: '#BFC9DB'
    },
    subtitle2:{
      fontSize: 12
    },
    body1: {
      fontSize: 14
    },
    body2: {
      fontSize: 14
    },
    caption: {
      fontSize: 11,
      color: '#BECCE2'
    }
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
