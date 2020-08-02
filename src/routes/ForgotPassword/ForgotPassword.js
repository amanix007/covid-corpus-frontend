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


  email: Yup.string().email("Invalid email").required("Email is required")


});







const ForgotPassword = () => {
  let history = useHistory();
  const [{ currentUser }, dispatch] = useAppState();

  const [message, setMessage] = React.useState(null);
  const [successMessage, setsuccessMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);







  return (
    <React.Fragment>

      <div className="col-12 col-sm-12 col-md-12 col-lg-5 offset-lg-1 register-left">
        <h3>Forgot Password</h3>
        {message && (
          <ValidationError message={message} />
        )}
        {!loading && (
          <Formik
            initialValues={{
              email: ""
            }}
            validationSchema={RegisterSchema}
            validateOnChange={false}
            validateOnBlur={false}
            onSubmit={(values, actions) => {
              actions.setSubmitting(true);
              setMessage(null);
              authenticationService.forgotPassword({ ...values })
                .then(data => {
                  // console.log("Got login data:", loginToken)
                  // dispatch({ type: LOGIN_USER_SUCCESS, loginUser: loginToken });
                  setsuccessMessage("Email Sent !!")
                  // history.push("/Home");
                })
                .catch(error => {
                  console.log('error:', error)
                  setMessage("Something went wrong while registering you into the system, please try again!")
                  
                })
                .finally(() => actions.setSubmitting(false));
            }}
          >
            {({ errors, touched, isSubmitting, ...formikProps }) => (
              <Form>


                <div className="form-group">
                  <Field name="email" type="email" className="form-control" placeholder="Email" />
                  {errors.email && touched.email ? <ValidationError message={errors.email} /> : null}
                </div>
                <p style={{ color: "green" }}>{successMessage}</p>
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
          <React.Fragment>Please wait... <Loading /> </React.Fragment>
        )}

      </div>



    </React.Fragment>
  );
};

export default ForgotPassword;
