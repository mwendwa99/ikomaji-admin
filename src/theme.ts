import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  typography: {
    fontFamily: ["Work Sans", "sans-serif"].join(","),
  },
  palette: {
    primary: {
      main: "#46DF99",
    },
    secondary: {
      main: "#F2F2F2",
    },
    text: {
      primary: "#000000",
      secondary: "#FFFFFF",
    },
    background: {
      default: "#F2F2F2",
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "7px",
          padding: "10px",
          fontSize: "0.5rem",
          textTransform: "capitalize",
        },
        contained: {
          // Some CSS
          color: "white",
          backgroundColor: "#46DF99",
          "&:hover": {
            backgroundColor: "#46DF99",
          },
        },
      },
    },
  },
});

export const tableTheme = {
  BaseRow: `
    font-size: 14px;
  `,
  HeaderRow: `
    background-color: #B9FFDF;
    position: sticky;

  `,
  Row: `
    &:nth-of-type(odd) {
      background-color: #fafafa;
    };
    &:nth-of-type(even) {
      background-color: #fefefe;
    };
    overflow-wrap: break-word;
  `,
  Cell: `
    padding: 10px;
    overflow-wrap: break-word;
  `,
  HeaderCell: `
    padding: 10px;
    `,
};
