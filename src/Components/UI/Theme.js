import { createTheme } from '@material-ui/core/styles';

const arcWhite = '#FFF';
const arcYellow = "#f0c14b";
const arcOrange = '#FFBA60';
const arcGrey = '#868686';

export default createTheme({
  palette: {
    common: {
      white:  arcWhite,
      blue: arcYellow,
      orange: arcOrange
    },
    primary: {
      main: arcWhite
    },
    secondary: {
      main: arcYellow
    }
  },
  typography: {
    tab: {
      textTransform: "none",
      fontWeight: 700,
      fontSize: "1rem"  
    },
    h5:{
      fontSize: "1.75em",
      fontWeight: 400,
      lineHeight: 1.2
    },
    body1: {
      fontWeight: 700,
      fontSize: "1.1em",
      color: "#111",
      fontFamily: ['"Amazon Ember"','Arial','sans-serif'].join(",")
    },
    body2: {
      color: "#111",
      fontFamily: ['"Amazon Ember"','Arial','sans-serif'].join(","),
      fontSize: "0.78rem",
    }
  },
  overrides: {
    MuiTooltip: {
      tooltip: {
        color: "lightblue",
        backgroundColor: arcOrange
      }
    }
  }
 
  

});