import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  typography: {
    fontFamily: "Open-Sans, sans-serif;",
    fontSize: 14,
    h1: {
      fontWeight: '600',
      fontSize: 26,
    },
    button: {
      textTransform: 'none'
    }
  },
  palette: {
    primary: { main: "#DF1B1B" },
    secondary: { main: "#6fbf73"}
  }
});
