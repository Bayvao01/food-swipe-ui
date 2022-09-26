import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  footer: {
    backgroundColor: "lightgray", /* For browsers that do not support gradients */
    background: "linear-gradient(to right,#fff,rgba(255,255,255,0),#fff)",
      width: "100%",
      zIndex: 1302,
      position: "relative",
      paddingTop: "25px",
      marginTop: "26px",
      paddingBottom: "25px"
  },
  link:{
    cursor: "pointer",
    textDecoration: "none",
    color: "#0066c0",
    fontSize: "0.75rem",
    padding: "18px",
    fontFamily: ['"Amazon Ember"','Arial','sans-serif'].join(","),
    "&:hover": {
      textDecoration: "underline",
    },
  },
  copyright: {
    fontSize: "0.85rem",
  }
}))

function Footer() {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Grid item container direction="column" justifyContent='center'>
        <Grid container direction='row' alignItems='center' justifyContent='center'>
          <Link className={classes.link} to="/">Privacy Notice</Link>
          <Link className={classes.link} to="/">Conditions of Use</Link>
          <Link className={classes.link} to="/">Help</Link>
        </Grid>
        <Grid item container justifyContent='center' style={{marginTop: "12px"}}>
          <Typography variant='body2' className={classes.copyright}> © 1996-2022, FoodSwipe.com, Inc. or its affiliates</Typography>
        </Grid>
      </Grid>
    </footer>
  )
}

export default Footer
