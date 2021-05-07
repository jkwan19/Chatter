import React, {
  useContext,
  useState,
  useEffect
} from "react";

/* MATERIAL UI STYLING */
import {
  Box,
  CssBaseline,
  Grid,
  Paper
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import auth from "../services/auth.service";
import { AuthContext } from "../context/AuthContext";

/* COMPONENTS */
import LandingImage from "../image/LandingImage";
import SubmitButton from "../submit/SubmitButton";
import AccountNavButtons from "../nav-buttons/AccountNavButtons";
import FormHeader from "../form/FormHeader";
import FormContainer from "../form/FormContainer";
import EmailField from "../form/EmailField";
import PasswordField from "../form/PasswordField";
import ErrorMessage from "../snackbar/ErrorMessage";

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: "100vh",
    "& .MuiInput-underline:before": {
      borderBottom: "1.2px solid rgba(0, 0, 0, 0.2)"
    },
    "& .MuiInput-underline:after": {
      borderBottom: "2px solid #3A8DFF"
    },
    [theme.breakpoints.down("sm")]: {
      width: 'auto'
    }
  },
  buttonHeader: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    flexDirection: "column",
    bgcolor: "background.paper",
    minHeight: "100vh",
    paddingTop: 23
  },
  box: {
    padding: 24,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    flexDirection: "column",
    maxWidth: 900,
    margin: "auto"
  },
  form: {
    display: "block",
    marginTop: theme.spacing(1),
    width: '100%'
  },
  formBox: {
    marginLeft: theme.spacing(12),
    width: '100%',
    maxWidth: 450,
    [theme.breakpoints.down("sm")]: {
      maxWidth: 300,
      margin: 'auto'
    }
  },
}));

// Login middleware placeholder
const login = (email, password) => auth.login(email, password);

export default function Login() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const history = useHistory();

  const { loggedIn, setLoggedIn, setUsername, setUserId } = useContext(AuthContext);

  useEffect(() => {
    if (loggedIn) history.push('/dashboard')
  }, [history, loggedIn]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  const handleError = () => {
    setOpen(true);
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <LandingImage />
      <Grid item xs={12} sm={7} md={7} component={Paper} square>
        <Box className={classes.buttonHeader}>
          <AccountNavButtons
            link={'/signup'}
            main={'Create account'}
            alt={`Don't have an account?`}/>
          <Grid
            item container xs={12} sm={12}
            spacing={3}
            justify="center"
            alignItems="center"
            className={classes.formBox}
            >
            <FormHeader value={'Welcome back!'}/>
            <Formik
              initialValues={{
                email: "",
                password: ""
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string()
                  .required("Email is required")
                  .email("Email is not valid"),
                password: Yup.string()
                  .required("Password is required")
                  .max(100, "Password is too long")
                  .min(6, "Password too short")
              })}
              onSubmit={({ email, password }, { setStatus, setSubmitting }) => {
                setStatus();
                login(email, password).then(
                  (res) => {
                    setLoggedIn(true)
                    setUsername(res.username);
                    setUserId(res._id)
                    history.push('/dashboard')
                  },
                  (error) => {
                    setSubmitting(false);
                    setStatus(error);
                  }
                )
              }}
            >
              {({ handleSubmit, handleChange, values, touched, errors }) => (
                <form
                  onSubmit={handleSubmit}
                  className={classes.form}
                  noValidate
                >
                  <EmailField
                    handleChange={handleChange}
                    errors={errors}
                    touched={touched}
                    values={values}
                  />
                  <PasswordField
                    handleChange={handleChange}
                    errors={errors}
                    touched={touched}
                    values={values}
                    page="Login"
                  />
                  <SubmitButton
                    name={'Login'}
                    handleError={handleError}
                    />
                </form>
              )}
            </Formik>
          </Grid>
          <FormContainer />
        </Box>
        <ErrorMessage
          open={open}
          message="Login Failed"
          handleClose={handleClose}/>
      </Grid>
    </Grid>
  );
}
