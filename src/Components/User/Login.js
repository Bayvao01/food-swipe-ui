import React from 'react';
import { Grid, Typography } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/styles";
import { alpha, withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import InputBase from "@material-ui/core/InputBase";
import logo from "../../assets/logo.png";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


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
    textTransform: 'none'
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


function Login() {

  const navigate = useNavigate();
  const classes = useStyles();
  const theme = useTheme();

  const [values, setValues] = React.useState({
    email: "",
    phoneNumber: "",
    password: ""
  });

  const [errors, setErrors] = React.useState({
    emailError: "",
    phoneNumberError: "",
    passwordError: "",
  });

  const setRegirstrationData = (event) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    setErrors({
      emailError: "",
      phoneNumberError: "",
      passwordError: "",
    });
    setValues({
      ...values,
      [fieldName]: fieldValue,
    });
  };

  const forgotPassword = (event) => {
    event.preventDefault();
    console.log("forgot password clicked!")
  }

  const registerUser = (event) => {
    event.preventDefault();
    console.log(values);

    if (!values.email) {
      setErrors({
        ...errors,
        emailError: "Email cannot be empty",
      });
      return;
    }

    if(!values.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
      setErrors({
        ...errors,
        emailError: "Invalid email",
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
   

    console.log(errors);

    if (
      errors.emailError ||
      errors.phoneNumberError ||
      errors.passwordError
    ) {
      return;
    }

    navigate("/phoneConfirmation", { state: values });
  };


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
            <Typography variant="h5">Sign in</Typography>
          </Grid>
          
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
          <Grid
          item
          container
          justifyContent="space-between"
          alignItems="flex-end"
          className={classes.margin}
        >
          <InputLabel shrink htmlFor="password" style={{ color: "black" }}>
            Password
          </InputLabel>
          <Typography  variant="body2" className={classes.link}>
            <span onClick={forgotPassword}>Forgot Password?</span>
          </Typography>
        </Grid>
            <FormControl className={classes.margin}>
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
              />
            </FormControl>
          </Grid>
          {errors.passwordError ? (
            <InputLabel shrink style={{ color: "red" }}>
              {errors.passwordError}
            </InputLabel>
          ) : undefined}
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
            Sign-In
          </Button>
        </Grid>
        <Grid item container className={classes.userForm}>
          <Typography variant="body2">
            By continuing, you agree to Company's 
              <span className={classes.link}> Conditions of Use </span> and 
              <span className={classes.link}> Privacy Notice</span>.
          </Typography>
        </Grid>
        <Grid item container className={classes.userForm}>
          <Typography variant="body2">
            Don't have an account?{" "}
            <Link to="/" className={classes.link}>
              {" "}
              Register here{" "}
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Login
