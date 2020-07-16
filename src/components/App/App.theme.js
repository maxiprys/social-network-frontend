import { createMuiTheme } from "@material-ui/core";
import { green, lime } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: green,
    secondary: lime,
  },
  typography: {
    useNextVariants: true,
  },
});

export default theme;