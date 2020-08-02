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
  password: Yup.string()
    .min(6, "Password need to be within 6 to 50 Character")
    .max(50, "Password need to be within 6 to 50 Character")
    .required("Password is required"),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords Do not match')
});




const ResetPassword = (props) => {
  let history = useHistory();



  const [message, setMessage] = React.useState(null);
  const [loading, setLoading] = React.useState(false);




  let token = new URLSearchParams(props.location.search).get("token");
  if (!token) {
    history.push("/Login");
  }

  return (
    <React.Fragment>

      <div className="col-12 col-sm-12 col-md-12 col-lg-5 offset-lg-1 register-left">
        <h3>Reset Password</h3>
        {message && (
          <ValidationError message={message} />
        )}
        {!loading && (
          <Formik
            initialValues={{
              password: "",
              passwordConfirmation: "",
            }}
            validationSchema={RegisterSchema}
            validateOnChange={false}
            validateOnBlur={false}
            onSubmit={(values, actions) => {
              actions.setSubmitting(true);
              setMessage(null);
              authenticationService.resetPassword({ ...values, token })
                .then(res => {
                  // dispatch({ type: LOGIN_USER_SUCCESS, loginUser: loginToken });
                  history.push("/Login");
                })
                .catch(error => {
                  console.log("Exception thrown while registering:", error)
                  setMessage("Something went wrong:  " + error)
                })
                .finally(() => actions.setSubmitting(false));
            }}
          >
            {({ errors, touched, isSubmitting, ...formikProps }) => (
              <Form>
                <div className="form-group">
                  <Field name="password" type="password" className="form-control" placeholder="Password" />
                  {errors.password && touched.password ? <ValidationError message={errors.password} /> : null}
                </div>
                <div className="form-group">
                  <Field name="passwordConfirmation" type="password" className="form-control" placeholder="Password Confirmation" />
                  {errors.passwordConfirmation && touched.passwordConfirmation ? <ValidationError message={errors.passwordConfirmation} /> : null}
                </div>





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
          <React.Fragment>Registering you into the system, please wait... <Loading /> </React.Fragment>
        )}

      </div>



    </React.Fragment>
  );
};

export default ResetPassword;
