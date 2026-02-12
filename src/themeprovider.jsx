import {
  CssBaseline,
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material";

const appTheme = createTheme({
  palette: {
    primary: {
      main: "rgba(139, 179, 181, 1)",
    },
    secondary: {
      main: "rgba(53, 94, 96, 1)",
    },
  },
});

export const ThemeProvider = ({ children }) => {
  return (
    <MuiThemeProvider theme={appTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};
