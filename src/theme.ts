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
    // MuiIconButton: {
    //   styleOverrides: {
    //     root: {
    //       width: "30px",
    //       height: "30px",
    //       color: "#46DF99",
    //       padding: "10px",
    //       backgroundColor: "#93f4c8",
    //       "&:hover": {
    //         backgroundColor: "#46DF99",
    //         color: "#FFFFFF",
    //       },
    //     },
    //   },
    // },
  },
});

export const tableTheme = {
  BaseRow: `
    font-size: 14px;
  `,
  HeaderRow: `
    background-color: #B9FFDF;
  `,
  Row: `
    &:nth-child(odd) {
      background-color: #fafafa;
    }

    &:nth-child(even) {
      background-color: #fefefe;
    }

    word-wrap: break-word;
  `,
  Cell: `
    padding: 10px;
    word-wrap: break-word;
  `,
  HeaderCell: `
    padding: 10px;
    `,
};
