
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: { 
    h1: {
      fontSize: "2rem",
      fontWeight: 500,
    }, 
    h2: {
      fontSize: "1.5rem",
      fontWeight: 500,
    },
    h3: {
      fontSize: "1.25rem",
      fontWeight: 500,
    },
  
  },
  spacing: 8,
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        body {
          background-color: #f5f5f5;
        }
      `,
    },
    
  }
});

export default theme;
