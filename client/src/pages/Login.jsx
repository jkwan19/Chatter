import React, {
  useState,
  useEffect
} from "react";

/* MATERIAL UI STYLING */
import {
  Box,
  CssBaseline,
  Grid,
  Paper,
  TextField,
  Typography
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import auth from "../services/auth.service";

/* COMPONENTS */
import LandingImage from "../image/LandingImage";
import SubmitButton from "../submit/SubmitButton";
import AccountNavButtons from "../nav-buttons/AccountNavButtons";
import FormHeader from "../form/FormHeader";
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
    width: "calc(100%)",
    marginTop: theme.spacing(1)
  },
  label: {
    fontSize: 14,
    color: "rgb(0,0,0,0.4)",
    paddingLeft: "5px"
  },
  inputs: {
    marginTop: ".8rem",
    height: "2rem",
    padding: "5px",
  },
  forgot: {
    paddingRight: 10,
    color: "#3a8dff",
    fontWeight: 400,
    fontSize: 12
  },
}));

// Login middleware placeholder
function useLogin() {
  const login = async (email, password) => {
    const res = await auth.login(email, password);
    localStorage.setItem("token", res.token);
  };
  return login;
}

export default function Login() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const history = useHistory();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) history.push("/dashboard");
  }, [history]);

  const login = useLogin();

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
            link={'/signup'}
            main={'Create account'}
            alt={`Don't have an account?`}/>
          <Box width="100%" maxWidth='66%' p={3} alignSelf="center">
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
                  () => {
                    history.push("/dashboard");
                    return;
                  },
                  error => {
                    setOpen(true);
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
                  <TextField
                    id="email"
                    label={
                      <Typography className={classes.label}>
                        E-mail address
                      </Typography>
                    }
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true
                    }}
                    InputProps={{ classes: { input: classes.inputs } }}
                    name="email"
                    autoComplete="email"
                    autoFocus
                    helperText={touched.email ? errors.email : ""}
                    error={touched.email && Boolean(errors.email)}
                    value={values.email}
                    onChange={handleChange}
                  />
                  <TextField
                    id="password"
                    label={
                      <Typography className={classes.label}>
                        Password
                      </Typography>
                    }
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true
                    }}
                    InputProps={{
                      classes: {
                        input: classes.inputs
                      },
                      endAdornment: (
                        <Typography
                          className={classes.forgot}
                          >
                          Forgot?
                        </Typography>
                      )
                    }}
                    size="medium"
                    type="password"
                    autoComplete="current-password"
                    helperText={touched.password ? errors.password : ""}
                    error={touched.password && Boolean(errors.password)}
                    value={values.password}
                    onChange={handleChange}
                  />
                  <SubmitButton name={'Login'}/>
                  <Box style={{ height: 95 }} />
                </form>
              )}
            </Formik>
          </Box>
          <Box p={1} alignSelf="center" />
        </Box>
        <ErrorMessage
          open={open}
          message="Login Failed"
          handleClose={handleClose}/>
      </Grid>
    </Grid>
  );
}
