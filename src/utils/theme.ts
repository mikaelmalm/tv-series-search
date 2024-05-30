import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    yellow: Palette["primary"];
  }
  interface PaletteOptions {
    yellow?: PaletteOptions["primary"];
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#14151a",
    },
    yellow: {
      main: "#FFD700",
    },
  },
  typography: {
    h1: {
      fontSize: "5rem",
      fontWeight: 500,
      "@media (max-width:600px)": {
        fontSize: "3rem",
      },
    },
    h2: {
      fontSize: "1.8rem",
      fontWeight: 500,
      "@media (max-width:600px)": {
        fontSize: "1.4rem",
      },
    },
    h3: {
      fontSize: "1.25rem",
      fontWeight: 500,
    },
    button: {
      fontSize: "1rem",
      fontWeight: 500,
      textTransform: "none",
    },
  },
  spacing: 8,
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        body {
          background-color: #f9f9f9;
        }

        a {
          text-decoration: none;
          color: inherit;
        }


      `,
    },
  },
});

export default theme;
