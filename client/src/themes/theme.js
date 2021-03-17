import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  typography: {
    fontFamily: "Open-Sans, sans-serif;",
    fontSize: 14,
    h1: {
      // could customize the h1 variant as well
      fontWeight: '600',
      fontSize: 26,
    }
  },
  palette: {
    primary: { main: "#DF1B1B" }
  }
});
