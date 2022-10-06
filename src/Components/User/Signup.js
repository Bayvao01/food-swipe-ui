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
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
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
  error: {
    color: "#c40000",
    fontSize: "16px",
    fontWeight: 500,
    font: "Amazon Ember, Arial, sans-serif",
    marginTop: "5px",
    marginBottom: "3px",
    contrast: 6.27
  }
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
    "&:invalid:not(:focus)": {
        boxShadow: `${alpha(theme.palette.secondary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: "red",
    }
    
  },
}))(InputBase);

function Signup() {
  const location = useLocation();
  const navigate = useNavigate();
  const classes = useStyles();
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const [openTooltip, setOpenTooltip] = React.useState(false);
  const [openPasswordValidTooltip, setPasswordValidOpenTooltip] = React.useState(false);
  const [open, setOpen] = React.useState(false);
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
    generalError: ""
  });

  const [success, setSuccess] = React.useState({
    status: "",
    message: "",
  });

  const [openSnakBar, setSnackBarOpen] = React.useState(false);

  function handleToggle(value) {
    setOpen(value);
  };

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

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackBarOpen(false);
  };

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
      generalError: ""
    });
    setValues({
      ...values,
      [fieldName]: fieldValue,
    });
  };

  const capitalizeFirstLetter = (string) => {
    return string[0].toUpperCase() + string.slice(1);
  };

  function validateUser() {
    if (!values.firstName) {
      setErrors({
        ...errors,
        firstNameError: "First Name cannot be empty",
      });
      return false;
    }
    if (!values.lastName) {
      setErrors({
        ...errors,
        lastNameError: "Last Name cannot be empty",
      });
      return false;
    }
    if (!values.email) {
      setErrors({
        ...errors,
        emailError: "Email cannot be empty",
      });
      return false;
    }

    if (!values.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      setErrors({
        ...errors,
        emailError: "Enter a valid email",
      });
      return false;
    }

    if (!values.phoneNumber || values.phoneNumber.length !== 10) {
      setErrors({
        ...errors,
        phoneNumberError: "Phone Number cannot be empty",
      });
      return false;
    }
    if (!values.password) {
      setErrors({
        ...errors,
        passwordError: "Password cannot be empty",
      });
      return false;
    }
    if (!values.repassword) {
      setErrors({
        ...errors,
        repasswordError: "Confirm Password cannot be empty",
      });
      return false;
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
      return false;
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
      return false;
    }

    return true;
  }

  async function postRegistrationData() {
    try {
      let response = await axios.post(
        "http://localhost:8080/v1/users/register",
        {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          contactNumber: values.phoneNumber,
          password: values.password,
        }
      );

      if (response.status === 200) {
        setSuccess({
          status: response.data.status,
          message: response.data.message,
        });
        return true;
      } else {
        return false;
      }
    } catch (error) {

      const errorResp = error.response;

      if (errorResp.status === 400) {
        const err = errorResp.data.errors;

        err.map((e) => {
          if (e.field === "firstName") {
            setErrors({
              ...errors,
              firstNameError: e.defaultMessage,
            });
            return false;
          }
          if (e.field === "lastName") {
            setErrors({
              ...errors,
              lastNameError: e.defaultMessage,
            });
            return false;
          }
          if (e.field === "email") {
            setErrors({
              ...errors,
              emailError: e.defaultMessage,
            });
            return false;
          }
          if (e.field === "contactNumber") {
            setErrors({
              ...errors,
              phoneNumberError: e.defaultMessage,
            });
            return false;
          }
          if (e.field === "password") {
            setErrors({
              ...errors,
              passwordError: e.defaultMessage,
            });
            return false;
          }
          return false;
        });
      }

      if(errorResp.status === 417 || errorResp.status === 503){
        setErrors({
          ...errors,
          generalError: errorResp.data.message,
        });
        setSnackBarOpen(true);
        return false;
      }

      return false;
    }
  }

  const registerUser = async (event) => {
    event.preventDefault();

    const validFlag = validateUser();

    if (!validFlag) {
      return;
    }

    handleToggle(true);
    console.log(open);

    const data = await postRegistrationData();

    handleToggle(false);

    if (!data) {
      return;
    }

    console.log(open);
    console.log(errors);
    console.log(success);
    //navigate("/phoneConfirmation", { state: values });
  };

  const passwordValidationRules = (
    <React.Fragment>
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
    </React.Fragment>
  );

  const confirmPasswordValidationRules = (
    <React.Fragment>
      <Typography>
        Entered password and confirm password should match.
      </Typography>
    </React.Fragment>
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
      <div>

      
      
      <Snackbar
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        open={openSnakBar}
        onClose={handleSnackbarClose}
        message={errors.generalError}
        ContentProps={{
          style: {backgroundColor:"#FF3232"}
        }}
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close"  color="inherit" onClick={handleSnackbarClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
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
                required={errors.firstNameError}
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
            <InputLabel shrink className={classes.error}>
              {errors.firstNameError}
            </InputLabel>
          ) : undefined}
          <Grid item>
            <FormControl className={classes.margin}>
              <InputLabel shrink htmlFor="lastName" style={{ color: "black" }}>
                Last Name
              </InputLabel>
              <BootstrapInput
                required={errors.lastNameError}
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
            <InputLabel shrink className={classes.error}>
              {errors.lastNameError}
            </InputLabel>
          ) : undefined}
          <Grid item>
            <FormControl className={classes.margin}>
              <InputLabel shrink htmlFor="email" style={{ color: "black" }}>
                Email
              </InputLabel>
              <BootstrapInput
                required={errors.emailError}
                error={errors.emailError}
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
            <InputLabel shrink className={classes.error}>
              {errors.emailError}
            </InputLabel>
          ) : undefined}
          <Grid item>
            <FormControl className={classes.margin}>
              <InputLabel shrink htmlFor="phone" style={{ color: "black" }}>
                Phone Number
              </InputLabel>
              <BootstrapInput
                required={errors.phoneNumberError}
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
            <InputLabel shrink className={classes.error}>
              {errors.phoneNumberError}
            </InputLabel>
          ) : undefined}
          <Grid item>
            <FormControl className={classes.margin}>
              <InputLabel shrink htmlFor="password" style={{ color: "black" }}>
                Password
              </InputLabel>
              <BootstrapInput
                required={errors.passwordError}
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
            <InputLabel shrink className={classes.error}>
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
                required={errors.repasswordError}
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
            <InputLabel shrink className={classes.error}>
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
            <Link to="/login" className={classes.link}>
              {" "}
              Sign in{" "}
            </Link>
          </Typography>
        </Grid>
        <Backdrop
          className={classes.backdrop}
          open={open}
        >
          <CircularProgress color="secondary" />
        </Backdrop>
      </Grid>
    </Grid>
  );
}

export default Signup;
