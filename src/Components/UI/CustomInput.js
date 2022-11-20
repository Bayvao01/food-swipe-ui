import React from "react";
import { alpha, withStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";

export const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
      fontSize: "13px",
    },
  },
  input: {
    "&[type=number]": {
      "-moz-appearance": "textfield",
    },
    "&::-webkit-outer-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
    "&::-webkit-inner-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
    borderRadius: 4,
    border: "1px solid #ced4da",
    fontSize: "13px",
    width: "100%",
    fontWeight: 400,
    padding: "5px 8px",
    fontFamily: ["Roboto", '"Helvetica Neue"', "Arial", "sans-serif"].join(","),
    "&:focus": {
      boxShadow: `${alpha(theme.palette.secondary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.secondary.main,
    },
    "&:invalid:not(:focus)": {
        boxShadow: `${alpha(theme.palette.secondary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: "red",
    }
    
  },
}))(InputBase);
