import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/styles";
import { alpha, withStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import logo from "../../assets/logo.png";
import InputBase from "@material-ui/core/InputBase";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";
import {useLocation} from 'react-router-dom';
import { useNavigate } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  formContainer: {
    border: "1px #ddd solid",
    marginTop: "15px",
    maxWidth: "23em",
    borderRadius: "4px",
  },
  logo: {
    height: "2.5em",
    marginTop: "15px",
  },
  heading:{
    marginTop: "15px"
  },
  userForm: {
    paddingLeft: "20px",
    paddingRight: "20px",
    marginTop: "10px",
    marginBottom: "10px",
  },
  margin: {
    marginTop: theme.spacing(2),
    width: "100%",
  },
  customWidth: {
    maxWidth: 500,
    [theme.breakpoints.down("md")]: {
      maxWidth: 300,
    },
  },
  button: {
    width: "100%",
    borderColor: "#a88734 #9c7e31 #846a29",
    color: "#111",
    border: "0.5px solid #111",
    borderRadius: "5px",
    marginBottom: "30px",
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  link: {
    cursor: "pointer",
    textDecoration: "none",
    color: "#0066c0",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

const BootstrapInput = withStyles((theme) => ({
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
  },
}))(InputBase);

function PhoneConfirmation() {
  const navigate = useNavigate();
  const location = useLocation();
  const classes = useStyles();
  const theme = useTheme();

  const [otp, setOtp] = React.useState({
    phoneOtp: ""
  });

  const [otpErrors, setOtpErrors] = React.useState({
    phoneOtpError: "",
  });

  const resendOtp = (event) => {
    console.log("otp resent");
    console.log(location.state);
  };

  const setOtpValues = (event) => {
    event.preventDefault();
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    setOtp({
      [fieldName]: fieldValue,
    });
  }

  const createCustomer = (event) => {
    event.preventDefault();

    if(!otp.phoneOtp){
      setOtpErrors({
        phoneOtpError: "OTP cannot be empty",
      });
      return;
    }

    if(otp.phoneOtp.length !== 6){
      setOtpErrors({
        phoneOtpError: "Invalid OTP",
      });
      return;
    }
    console.log(otp.phoneOtp);
    console.log(location.state);
  }

  const changePhoneNumber = (event) => {
    console.log(location.state);
    navigate('/', {state: location.state});
  }

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item>
        <img src={logo} alt="LOGO" className={classes.logo} />
      </Grid>
      <Grid
        item
        container
        direction="column"
        className={classes.formContainer}
        xs
      >
        <Grid item container direction="column" className={classes.userForm}>
          <Grid item>
            <Typography variant="h4" className={classes.heading}>Verify mobile number</Typography>
          </Grid>
          <Typography variant="body2" className={classes.margin}>
            A text with a One Time Password (OTP) has been sent to your mobile
            number: <b> {location.state.phoneNumber} </b> 
            <span className={classes.link} onClick={changePhoneNumber}> Change </span>
          </Typography>
          <Grid item>
            <Grid
              item
              container
              justifyContent="space-between"
              alignItems="flex-end"
              className={classes.margin}
            >
              <InputLabel shrink htmlFor="phoneOtp" style={{ color: "black" }}>
                Enter OTP:
              </InputLabel>
              <Typography  variant="body2" className={classes.link}>
                <span onClick={resendOtp}>Resend OTP</span>
              </Typography>
            </Grid>
            <FormControl className={classes.margin}>
              <BootstrapInput
                id="phoneOtp"
                value={otp.otp}
                onChange={setOtpValues}
                inputProps={{
                  name: "phoneOtp",
                  id: "phoneOtp",
                }}
              />
            </FormControl>
          </Grid>
          {otpErrors.phoneOtpError ? (
            <InputLabel shrink style={{ color: "red" }}>
              {otpErrors.phoneOtpError}
            </InputLabel>
          ) : undefined}
        </Grid>

        <Grid item container className={classes.userForm}>
          <Button
            variant="contained"
            size="small"
            color="secondary"
            onClick={createCustomer}
            className={classes.button}
            startIcon={<SaveIcon />}
          >
            Create Account
          </Button>
        </Grid>
        <Grid item container className={classes.userForm}>
          <Typography variant="body2">
              By creating an account or logging in, you agree to Company's 
              <span className={classes.link}> Conditions of Use </span> and 
              <span className={classes.link}> Privacy Notice</span>.
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default PhoneConfirmation;
