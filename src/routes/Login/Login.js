import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field } from "formik";
import ValidationError from 'components/ValidationError';
import Loading from 'components/Loading';
import * as Yup from "yup";
import GoogleLogin from 'react-google-login';
import { useAppState } from 'components/AppState';
import { authenticationService } from '../../services';
import { LOGIN_USER_SUCCESS } from "../../actions";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password need to be within 6 to 50 Character")
    .max(50, "Password need to be within 6 to 50 Character")
    .required("Password is required"),
});


const Login = () => {
  let history = useHistory();
  const [{ currentUser }, dispatch] = useAppState();


  const [message, setMessage] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    console.log("currentUser login", currentUser);
    if (currentUser)
      history.push("/Home");
  }, []);

  const responseGoogle = (response) => {
    setLoading(true);
    authenticationService.loginByGoogle(response)
      .then(loginToken => {
        setLoading(false);
        dispatch({ type: LOGIN_USER_SUCCESS, loginUser: loginToken });
        history.push("/Home");
      });
  }

  return (
    <React.Fragment>
      <div className="col-12 col-sm-12 col-md-12 col-lg-6 offset-lg-3">
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
      </div>
      {/* <div className="col-12 col-sm-12 col-md-12 col-lg-3">
        <div className="sj-widget sj-widgetsinginwith">
          <div className="sj-widgetcontent">
            <ul>
              <li className="sj-loginlinkdin"><a href="javascript:void(0);"><i className="fab fa-linkedin-in"></i><span>Sign in with<em>“Linkedin”</em></span></a></li>
            </ul>
          </div>
        </div>
      </div> */}

      {/* <div className="col-12 col-sm-12 col-md-12 col-lg-6 offset-lg-3 mt-3 mb-2">
        <hr />
      </div> */}

      <div className="col-12 col-sm-12 col-md-12 col-lg-6 offset-lg-3">
        <h3>Login Now</h3>
        {!loading && (
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={LoginSchema}
            validateOnChange={false}
            validateOnBlur={false}
            onSubmit={(values, actions) => {
              // actions.setSubmitting(true);
              setMessage(null);
              authenticationService.login(values.email, values.password)
                .then(loginToken => {
                  console.log("Got login data:", loginToken)
                  dispatch({ type: LOGIN_USER_SUCCESS, loginUser: loginToken });
                  history.push("/Home");
                })
                .catch(error => {
                  if (error === "Unauthorized") {
                    setMessage('Please Enter Correct Email and Password')
                  } else if (error === 'Forbidden') {
                    setMessage('Please confirm your email');
                  } else {
                    setMessage(error.error)
                  }
                  console.log('error:', error)
                })
                .finally(() => actions.setSubmitting(false));
            }}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form>
                <div className="form-group">
                  <Field name="email" type="email" className="form-control" placeholder="Email" />
                  {errors.email && touched.email ? <ValidationError message={errors.email} /> : null}
                </div>

                <div className="form-group">
                  <Field name="password" type="password" className="form-control" placeholder="Password" />
                  {errors.password && touched.password ? <ValidationError message={errors.password} /> : null}
                </div>

                {message && (
                  <ValidationError message={message} />
                )}
                <p className="text-right"> <a href="#"
                  onClick={e => {
                    e.preventDefault();
                    history.push("/forgot-password");
                  }}
                >Forgot Password?</a></p>

                <button type="submit" className="dk-btn dk-btn-blue" disabled={isSubmitting}>

                  Submit
                  {" "}
                  {isSubmitting && <i className="fa fa-spinner fa-pulse fa-1x fa-fw"></i>}
                </button>
              </Form>
            )}
          </Formik>
        )}
        {loading && (
          <React.Fragment>Logging you in, please wait... <Loading /> </React.Fragment>
        )}

      </div>
    </React.Fragment>
  );
};

export default Login;
