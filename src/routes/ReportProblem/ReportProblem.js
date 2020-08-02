import React, { useState } from "react";
import { useAppState } from 'components/AppState';
import { useHistory } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import DkTextbox from "components/DkTextbox";
import DkTextarea from "components/DkTextarea";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, FormGroup } from 'reactstrap';

import { reportProblemService } from 'services';

const ReportProblem = () => {
    let history = useHistory();
    const [{ currentUser }, dispatch] = useAppState();

    const [modal, setModal] = useState(false);
    const [unmountOnClose, setUnmountOnClose] = useState(true);

    const toggle = () => setModal(!modal);


    const changeUnmountOnClose = e => {
        let value = e.target.value;
        setUnmountOnClose(JSON.parse(value));
    }
    return (
        <React.Fragment>
            {currentUser && (
                <React.Fragment>
                    <div className="col-lg-6 offset-lg-3">
                        <div className="dk-page-title">Report a Problem</div>
                        <Formik
                            initialValues={{
                                subject: '',
                                description: '',
                            }}
                            validationSchema={Yup.object().shape({
                                subject: Yup.string().required("Subject is required"),
                                description: Yup.string().required("Description is required"),
                            })}
                            validateOnChange={false}
                            validateOnBlur={false}
                            onSubmit={(values, actions) => {
                                console.log("ReportProblem Submit", values);
                                reportProblemService.create(values.subject, values.description)
                                    .then(data => {
                                        setModal(true);
                                    })
                                    .catch(error => alert(error.message))
                                    .finally(() => actions.setSubmitting(false));
                            }}
                        >
                            {({ setFieldValue, errors, touched, values, isSubmitting }) => (
                                <Form>
                                    <DkTextbox title="Subject" required value={values.subject} propName="subject"
                                        errors={errors.subject}
                                        touched={touched.subject} setFieldValue={setFieldValue} />

                                    <DkTextarea rows="5" title="Description" required value={values.description}
                                        propName="description"
                                        errors={errors.description} touched={touched.description}
                                        setFieldValue={setFieldValue} />

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

                    <Modal isOpen={modal} toggle={toggle} unmountOnClose={unmountOnClose}>
                        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
                        <ModalBody>
                            The problem has been stored.
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={(e) => { e.preventDefault(); history.push("/Home")}}>Close</Button>
                        </ModalFooter>
                    </Modal>
                </React.Fragment>
    )
}
        </React.Fragment >
    )
}

export default ReportProblem;