import React from "react";
import { useAppState } from 'components/AppState';
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Box, Typography } from '@material-ui/core';
import DkTextbox from "components/DkTextbox";
import DkTextarea from "components/DkTextarea";
import { contactService } from 'services';

const Contact = () => {
    return (
        <React.Fragment>
            <div className="col-12 col-sm-12 col-md-8 offset-md-2">
                <div className="dk-page-title">Contact Us</div>
                <Formik
                    initialValues={{
                        name: "",
                        email: "",
                        organisation: "",
                        message: ""
                    }}
                    validationSchema={Yup.object().shape({
                        name: Yup.string().required("Name is required"),
                        email: Yup.string().required("Email is required"),
                        message: Yup.string().required("Message is required"),
                    })}
                    validateOnChange={false}
                    validateOnBlur={false}
                    onSubmit={(values, actions) => {
                        console.log("Contact Submit", values);
                        contactService.send({ name: values.name, email: values.email, organisation: values.organisation, message: values.message })
                            .then(() => {
                            })
                            .catch(error => alert(error.message))
                            .finally(() => actions.setSubmitting(false));
                    }}
                >
                    {({ setFieldValue, errors, touched, values, isSubmitting }) => (
                        <Form>
                            <DkTextbox title="Name" required value={values.name} propName="name" errors={errors.name}
                                touched={touched.name} setFieldValue={setFieldValue} />

                            <DkTextbox title="Email" required value={values.email} propName="email" errors={errors.email}
                                touched={touched.email} setFieldValue={setFieldValue} />

                            <DkTextbox title="Organisation" value={values.organisation} propName="organisation"
                                errors={errors.organisation} touched={touched.organisation} setFieldValue={setFieldValue} />

                            <DkTextarea title="Message" required value={values.message} propName="message" errors={errors.message}
                                touched={touched.message} setFieldValue={setFieldValue} rows="8" />


                            <div className="form-group">
                                <button
                                    type="submit"
                                    className="dk-btn dk-btn-blue pull-left"
                                    disabled={isSubmitting}
                                >
                                    Send
                                        </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </React.Fragment>
    );
};

export default Contact;
