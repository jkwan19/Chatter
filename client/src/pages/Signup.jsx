import React, {
  useContext,
  useEffect,
  useState
} from "react";

/* MATERIAL UI STYLING */
import {
  Box,
  CssBaseline,
  Grid,
  Paper,
  Typography
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
import UsernameField from "../form/UsernameField";
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
    marginTop: theme.spacing(1)
  },
  formBox: {
    marginLeft: theme.spacing(12),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(4),
    width: '100%',
    maxWidth: 450
  },
}));

// Register middleware placeholder
const register = (username, email, password) => auth.register(username, email, password);


export default function Register() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const { loggedIn, setLoggedIn } = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    if (loggedIn) history.push('/dashboard')
  }, [history]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <LandingImage />
      <Grid item xs={12} sm={8} md={7} elevation={6} component={Paper} square>
        <Box className={classes.buttonHeader}>
          <AccountNavButtons
            link={'/login'}
            main={'Login'}
            alt={'Already have an account?'}/>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            className={classes.formBox}>
            <FormHeader value={'Create an account'} />
            <Formik
              initialValues={{
                username:"",
                email: "",
                password: ""
              }}
              validationSchema={Yup.object().shape({
                username: Yup.string()
                  .required("Username is required")
                  .max(40, "Username is too long"),
                email: Yup.string()
                  .required("Email is required")
                  .email("Email is not valid"),
                password: Yup.string()
                  .required("Password is required")
                  .max(100, "Password is too long")
                  .min(6, "Password too short")
              })}
              onSubmit={(
                { username, email, password },
                { setStatus, setSubmitting }
              ) => {
                setStatus();
                register(username, email, password).then(
                  (res) => {
                    setLoggedIn(true)
                  },
                  error => {
                    setSubmitting(false);
                    setOpen(true);
                    setStatus(error);
                  }
                ).then(
                  history.push('/dashboard')
                )
              }}
            >
              {({ handleSubmit, handleChange, values, touched, errors }) => (
                <form
                  onSubmit={handleSubmit}
                  className={classes.form}
                  noValidate
                >
                  <UsernameField
                    handleChange={handleChange}
                    errors={errors}
                    touched={touched}
                    values={values}
                  />
                  <EmailField
                    handleChange={handleChange}
                    errors={errors}
                    touched={touched}
                    values={values}
                    page="Signup"
                  />
                  <PasswordField
                    handleChange={handleChange}
                    errors={errors}
                    touched={touched}
                    values={values}
                  />
                  <SubmitButton name={'Create'} />
                </form>
              )}
            </Formik>
          </Grid>
          <FormContainer />
        </Box>
        <ErrorMessage
          open={open}
          message="Registration failed"
          handleClose={handleClose} />
      </Grid>
    </Grid>
  );
}
