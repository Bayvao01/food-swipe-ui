import { Grid, Typography } from "@material-ui/core";
import React from "react";
import { makeStyles, useTheme } from "@material-ui/styles";
import { alpha, withStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import InputBase from "@material-ui/core/InputBase";
import logo from "../../assets/logo.png";
import InfoIcon from "@material-ui/icons/Info";
import Tooltip from "@material-ui/core/Tooltip";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import phData from "../../assets/country-ph-code.json";

const useStyles = makeStyles((theme) => ({
  formContainer: {
    border: "1px #ddd solid",
    marginTop: "10px",
    maxWidth: "23em",
    borderRadius: "4px",
  },
  logo: {
    height: "2.5em",
    marginTop: "15px",
  },
  userForm: {
    paddingLeft: "20px",
    paddingRight: "20px",
    marginTop: "10px",
    marginBottom: "10px",
  },
  margin: {
    marginTop: theme.spacing(1),
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

function Signup() {
  const location = useLocation();
  const navigate = useNavigate();
  const classes = useStyles();
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const [openTooltip, setOpenTooltip] = React.useState(false);
  const [openPasswordValidTooltip, setPasswordValidOpenTooltip] =
    React.useState(false);

  const handlePasswordValidTooltipClose = () => {
    setPasswordValidOpenTooltip(false);
  };

  const handlePasswordValidTooltipOpen = () => {
    setPasswordValidOpenTooltip(true);
  };

  const handleTooltipClose = () => {
    setOpenTooltip(false);
  };

  const handleTooltipOpen = () => {
    setOpenTooltip(true);
  };

  const [values, setValues] = React.useState({
    firstName: location.state ? location.state.firstName : "",
    lastName: location.state ? location.state.lastName : "",
    email: location.state ? location.state.email : "",
    phoneNumber: location.state ? location.state.phoneNumber : "",
    password: "",
    repassword: "",
  });

  const [errors, setErrors] = React.useState({
    firstNameError: "",
    lastNameError: "",
    emailError: "",
    phoneNumberError: "",
    passwordError: "",
    repasswordError: "",
  });

  const setRegirstrationData = (event) => {
    const fieldName = event.target.name;
    let fieldValue = event.target.value;
    if (fieldValue && (fieldName === "firstName" || fieldName === "lastName")) {
      fieldValue = capitalizeFirstLetter(event.target.value);
    }
    setErrors({
      firstNameError: "",
      lastNameError: "",
      emailError: "",
      phoneNumberError: "",
      passwordError: "",
      repasswordError: "",
    });
    setValues({
      ...values,
      [fieldName]: fieldValue,
    });
  };

  const capitalizeFirstLetter = (string) => {
    return string[0].toUpperCase() + string.slice(1);
  };

  const registerUser = (event) => {
    event.preventDefault();
    console.log(values);

    console.log(phData);
    if (!values.firstName) {
      setErrors({
        ...errors,
        firstNameError: "First Name cannot be empty",
      });
      return;
    }
    if (!values.lastName) {
      setErrors({
        ...errors,
        lastNameError: "Last Name cannot be empty",
      });
      return;
    }
    if (!values.email) {
      setErrors({
        ...errors,
        emailError: "Email cannot be empty",
      });
      return;
    }
    if (!values.phoneNumber || values.phoneNumber.length !== 10) {
      setErrors({
        ...errors,
        phoneNumberError: "Phone Number cannot be empty",
      });
      return;
    }
    if (!values.password) {
      setErrors({
        ...errors,
        passwordError: "Password cannot be empty",
      });
      return;
    }
    if (!values.repassword) {
      setErrors({
        ...errors,
        repasswordError: "Confirm Password cannot be empty",
      });
      return;
    }
    if (
      values.password &&
      values.repassword &&
      values.password !== values.repassword
    ) {
      setErrors({
        ...errors,
        repasswordError: "Password and Confirm Password should match",
      });
      return;
    }

    console.log(errors);

    if (
      errors.emailError ||
      errors.firstNameError ||
      errors.lastNameError ||
      errors.phoneNumberError ||
      errors.passwordError ||
      errors.repasswordError
    ) {
      return;
    }

    navigate("/phoneConfirmation", { state: values });
  };

  const passwordValidationRules = (
    <>
      <Typography>
        1. Password should contain atleast one upperer case letter [A-Z]
      </Typography>
      <Typography>
        2. Password should contain atleast one lower case letter [a-z]
      </Typography>
      <Typography>
        3. Password should contain atleast one number [0-9]
      </Typography>
      <Typography>
        4. Password should contain atleast one special characters
        [!,@,#,$,%,*,.,?,=]
      </Typography>
      <Typography>
        5. Password should be atleast 8 characters in length
      </Typography>
    </>
  );

  const confirmPasswordValidationRules = (
    <>
      <Typography>
        Entered password and confirm password should match.
      </Typography>
    </>
  );

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
            <Typography variant="h5">Create Account</Typography>
          </Grid>
          <Grid item>
            <FormControl className={classes.margin}>
              <InputLabel shrink htmlFor="firstName" style={{ color: "black" }}>
                First Name
              </InputLabel>

              <BootstrapInput
                placeholder="First Name"
                value={values.firstName}
                onChange={setRegirstrationData}
                id="firstName"
                inputProps={{
                  name: "firstName",
                  id: "firstName",
                }}
              />
            </FormControl>
          </Grid>
          {errors.firstNameError ? (
            <InputLabel shrink style={{ color: "red" }}>
              {errors.firstNameError}
            </InputLabel>
          ) : undefined}
          <Grid item>
            <FormControl className={classes.margin}>
              <InputLabel shrink htmlFor="lastName" style={{ color: "black" }}>
                Last Name
              </InputLabel>
              <BootstrapInput
                placeholder="Last Name"
                id="lastName"
                value={values.lastName}
                onChange={setRegirstrationData}
                inputProps={{
                  name: "lastName",
                  id: "lastName",
                }}
              />
            </FormControl>
          </Grid>
          {errors.lastNameError ? (
            <InputLabel shrink style={{ color: "red" }}>
              {errors.lastNameError}
            </InputLabel>
          ) : undefined}
          <Grid item>
            <FormControl className={classes.margin}>
              <InputLabel shrink htmlFor="email" style={{ color: "black" }}>
                Email
              </InputLabel>
              <BootstrapInput
                placeholder="something@example.com"
                id="email"
                value={values.email}
                onChange={setRegirstrationData}
                inputProps={{
                  name: "email",
                  id: "email",
                }}
              />
            </FormControl>
          </Grid>
          {errors.emailError ? (
            <InputLabel shrink style={{ color: "red" }}>
              {errors.emailError}
            </InputLabel>
          ) : undefined}
          <Grid item>
            <FormControl className={classes.margin}>
              <InputLabel shrink htmlFor="phone" style={{ color: "black" }}>
                Phone Number
              </InputLabel>
              <BootstrapInput
                type="number"
                placeholder="Phone Number"
                id="phone"
                value={values.phoneNumber}
                onChange={setRegirstrationData}
                inputProps={{
                  name: "phoneNumber",
                  id: "phone",
                }}
              />
            </FormControl>
          </Grid>
          {errors.phoneNumberError ? (
            <InputLabel shrink style={{ color: "red" }}>
              {errors.phoneNumberError}
            </InputLabel>
          ) : undefined}
          <Grid item>
            <FormControl className={classes.margin}>
              <InputLabel shrink htmlFor="password" style={{ color: "black" }}>
                Password
              </InputLabel>
              <BootstrapInput
                placeholder="At least 8 characters"
                type={values.showPassword ? "text" : "password"}
                id="password"
                value={values.password}
                onChange={setRegirstrationData}
                inputProps={{
                  name: "password",
                  id: "password",
                }}
                endAdornment={
                  <Tooltip
                    title={passwordValidationRules}
                    arrow
                    classes={{ tooltip: classes.customWidth }}
                    placement={matchesMD ? "top" : "right"}
                    onClose={handlePasswordValidTooltipClose}
                    open={openPasswordValidTooltip}
                  >
                    <InfoIcon
                      onMouseOver={handlePasswordValidTooltipOpen}
                      onMouseOut={handlePasswordValidTooltipClose}
                      onClick={handlePasswordValidTooltipOpen}
                      edge="end"
                      style={{ cursor: "pointer" }}
                    ></InfoIcon>
                  </Tooltip>
                }
              />
            </FormControl>
          </Grid>
          {errors.passwordError ? (
            <InputLabel shrink style={{ color: "red" }}>
              {errors.passwordError}
            </InputLabel>
          ) : undefined}
          <Grid item>
            <FormControl className={classes.margin}>
              <InputLabel
                shrink
                htmlFor="repassword"
                style={{ color: "black" }}
              >
                Confirm Password
              </InputLabel>
              <BootstrapInput
                placeholder="Password and confirm password should match"
                type={values.showPassword ? "text" : "password"}
                id="repassword"
                value={values.repassword}
                onChange={setRegirstrationData}
                inputProps={{
                  name: "repassword",
                  id: "repassword",
                }}
                endAdornment={
                  <Tooltip
                    onMouseOver={handleTooltipOpen}
                    onMouseOut={handleTooltipClose}
                    title={confirmPasswordValidationRules}
                    arrow
                    classes={{ tooltip: classes.customWidth }}
                    placement={matchesMD ? "top" : "right"}
                    onClose={handleTooltipClose}
                    open={openTooltip}
                  >
                    <InfoIcon
                      onMouseOver={handleTooltipOpen}
                      onMouseOut={handleTooltipClose}
                      onClick={handleTooltipOpen}
                      edge="end"
                      style={{ cursor: "pointer" }}
                    ></InfoIcon>
                  </Tooltip>
                }
              />
            </FormControl>
          </Grid>
          {errors.repasswordError ? (
            <InputLabel shrink style={{ color: "red" }}>
              {errors.repasswordError}
            </InputLabel>
          ) : undefined}
        </Grid>
        <Grid item container className={classes.userForm}>
          <Typography variant="body2">
            We will send a text to verify your phone and email.
          </Typography>
          <Typography variant="body2">
            Message and Data rates may apply.
          </Typography>
        </Grid>
        <Grid item container className={classes.userForm}>
          <Button
            variant="contained"
            size="small"
            color="secondary"
            className={classes.button}
            startIcon={<SaveIcon />}
            onClick={registerUser}
          >
            Continue
          </Button>
        </Grid>
        <Grid item container className={classes.userForm}>
          <Typography variant="body2">
            Already have an account?{" "}
            <Link to="/" className={classes.link}>
              {" "}
              Sign in{" "}
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Signup;
