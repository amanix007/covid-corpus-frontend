import React from "react";
import { useHistory } from 'react-router-dom';
import { useAppState } from 'components/AppState';
import { Formik, Form, Field } from "formik";
import ValidationError from 'components/ValidationError';
import Loading from 'components/Loading';
import GoogleLogin from 'react-google-login';
import * as Yup from "yup";
import { LOGIN_USER_SUCCESS } from "../../actions";
import { Row } from 'reactstrap';

import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

import { authenticationService } from 'services';
import { DialogContent, DialogContentText } from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const RegisterSchema = Yup.object().shape({
  firstName: Yup.string().required("You need to enter your first name"),
  lastName: Yup.string().required("You need to enter your last name"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  terms: Yup.boolean().oneOf([true], 'You must accept our terms & conditions'),
  password: Yup.string()
    .min(6, "Password need to be within 6 to 50 Character")
    .max(50, "Password need to be within 6 to 50 Character")
    .required("Password is required"),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords do not match')
});






function SimpleDialog(props) {
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };



  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Dummy Content for Terms and condition
      
      
      
        <IconButton 
        style={{
          position: "absolute",
          right: 8,
          top: 8,
        }}
        aria-label="close" onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Let Google help apps determine location. This means sending anonymous location data to
          Google, even when no apps are running.
          </DialogContentText>
      </DialogContent>

    </Dialog>
  );
}

const Register = () => {
  let history = useHistory();
  const [{ currentUser }, dispatch] = useAppState();

  const [message, setMessage] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [googleLoading, setGoogleLoading] = React.useState(false);

  const [open, setOpen] = React.useState(false);
  const [forgotPassLink, showForgotPasslink] = React.useState(false);

  const handleClickOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



  React.useEffect(() => {
    console.log("Got message:", message)
  }, [message]);

  React.useEffect(() => {

  }, []);

  const responseGoogle = (response) => {
    setGoogleLoading(true);
    authenticationService.loginByGoogle(response)
      .then(loginToken => {
        setGoogleLoading(false);
        dispatch({ type: LOGIN_USER_SUCCESS, loginUser: loginToken });
        history.push("/Home");
      });
  }

  return (
    <React.Fragment>

      <div className="col-12 col-sm-12 col-md-12 col-lg-5 offset-lg-1 register-left">
        <h3>Register</h3>
        {message && (
          <ValidationError message={message} />
        )}
        {!loading && (
          <Formik
            initialValues={{
              email: "",
              password: "",
              repeatPassword: "",
              firstName: "",
              lastName: "",
              terms: false
            }}
            validationSchema={RegisterSchema}
            validateOnChange={false}
            validateOnBlur={false}
            onSubmit={(values, actions) => {
              actions.setSubmitting(true);
              setMessage(null);
              authenticationService.register({ ...values })
                .then(loginToken => {
                  // console.log("Got login data:", loginToken)
                  // dispatch({ type: LOGIN_USER_SUCCESS, loginUser: loginToken });
                  history.push("/EmailVerificationNeeded");
                })
                .catch(error => {
                  console.log("Exception thrown while registering:", error)
                  if (error === "Conflict") {
                    showForgotPasslink(true);
                    setMessage("The email has already been taken.");
                  } else {
                    setMessage("Something went wrong while registering you into the system, please try again!")
                  }
                })
                .finally(() => actions.setSubmitting(false));
            }}
          >
            {({ errors, touched, isSubmitting, ...formikProps }) => (
              <Form>
                <div className="form-group">
                  <Field name="firstName" type="text" className="form-control" placeholder="First name" />
                  {errors.firstName && touched.firstName ? <ValidationError message={errors.firstName} /> : null}
                </div>
                <div className="form-group">
                  <Field name="lastName" type="text" className="form-control" placeholder="Last name" />
                  {errors.lastName && touched.lastName ? <ValidationError message={errors.lastName} /> : null}
                </div>
                <div className="form-group">
                  <Field name="email" type="email" className="form-control" placeholder="Email" />
                  {errors.email && touched.email ? <ValidationError message={errors.email} /> : null}
                </div>

                <div className="form-group">
                  <Field name="password" type="password" className="form-control" placeholder="Password" />
                  {errors.password && touched.password ? <ValidationError message={errors.password} /> : null}
                </div>
                <div className="form-group">
                  <Field name="passwordConfirmation" type="password" className="form-control" placeholder="Password Confirmation" />
                  {errors.passwordConfirmation && touched.passwordConfirmation ? <ValidationError message={errors.passwordConfirmation} /> : null}
                </div>


                <div class="form-group">


                  <SimpleDialog open={open} onClose={handleClose} />


                  <Field name="terms" type="checkbox" checked={formikProps.values.terms} />{" "}


                    By registering, you accept our{" "}
                  <a
                    // href="javascript:void(0);"
                    href="#"
                    onClick={handleClickOpen}>
                    Terms &amp; Conditions
                    </a>

{forgotPassLink  &&   <p > <a href="#"
                  onClick={e => {
                    e.preventDefault();
                    history.push("/forgot-password");
                  }}
                >Forgot Password ?</a></p>}
                  {errors.terms && touched.terms ? <div><ValidationError message={errors.terms} /></div> : null}
                </div>

                <button type="submit" className="dk-btn dk-btn-blue" disabled={isSubmitting}>
                  Register
                  {" "}
                  {isSubmitting && <i className="fa fa-spinner fa-pulse fa-1x fa-fw"></i>}
                </button>
              </Form>
            )}
          </Formik>
        )}
        {loading && (
          <React.Fragment>Registering you into the system, please wait... <Loading /> </React.Fragment>
        )}

      </div>

      <div className="col-12 col-sm-12 col-md-12 col-lg-5 flex-center-center">

        <div className="sj-widget sj-widgetsinginwith">
          {/* <div className="sj-widgetcontent">
            <ul>
              <li className="sj-logingoogle">
                <GoogleLogin
                  render={renderProps => (
                    <button onClick={renderProps.onClick} disabled={renderProps.disabled} >
                      <i className="fab fa-google-plus-g"></i><span>Sign in with<em>“Google”</em></span>
                    </button>
                  )}
                  clientId="217339290041-gr51vvlde1j9pj3156or4jmf3tmsq0q8.apps.googleusercontent.com"
                  buttonText="Login"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={'single_host_origin'}
                />
              </li>
            </ul>
          </div> */}
        </div>
        {googleLoading && (
          <React.Fragment><Row><Loading /></Row></React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
};

export default Register;
