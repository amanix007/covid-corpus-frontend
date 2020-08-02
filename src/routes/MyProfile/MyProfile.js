import React, { useState } from "react";
import { useAppState } from 'components/AppState';
import { Formik, Form, Field } from "formik";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import DkTextbox from "components/DkTextbox";
import ProfilePhoto from 'components/ProfilePhoto';
import { userService } from 'services';
import { LOGIN_USER_SUCCESS } from "../../actions";
import { toast } from 'react-toastify';
import { ccToast } from "helpers/CommonFunctions";

const MyProfile = () => {
    let history = useHistory();
    const [{ currentUser }, dispatch] = useAppState();
    const [profilePhoto, setProfilePhoto] = React.useState('');
    return (
        <React.Fragment>
            {currentUser && (
                <React.Fragment>

                    <div className="col-lg-2 offset-lg-2">
                        <ProfilePhoto
                            size="large"
                            profilePhotoBase64={profilePhoto || currentUser.user.googleId && currentUser.user.profilePhoto}
                            profilePhotoPath={!currentUser.user.googleId && currentUser.user.profilePhoto}
                            enableEdit={true}
                            setProfilePhoto={setProfilePhoto}
                        />
                    </div>

                    <div className="col-lg-6">
                        <Formik
                            initialValues={{
                                name: currentUser.user.name,
                                surname: currentUser.user.surname,
                                email: currentUser.user.email,
                            }}
                            validationSchema={Yup.object().shape({
                                name: Yup.string().required("Name is required"),
                                surname: Yup.string().required("Surame is required"),
                            })}
                            validateOnChange={false}
                            validateOnBlur={false}
                            onSubmit={(values, actions) => {
                                console.log("MyProfile Submit", values);
                                userService.updateMyProfile({ id: currentUser.user.id, name: values.name, surname: values.surname, profilePhoto })
                                    .then(() => {
                                        let userTemp = currentUser
                                        userTemp.user.name = values.name
                                        userTemp.user.surname = values.surname
                                        userTemp.user.profilePhoto = profilePhoto
                                        dispatch({ type: LOGIN_USER_SUCCESS, loginUser: userTemp });
                                        localStorage.setItem('covidUser', JSON.stringify(userTemp));
                                        ccToast("Profile successfully updated!", "success")
                                        // toast.info('Profile successfully updated!', {
                                        //     position: "top-center",
                                        //     autoClose: 5000,
                                        //     hideProgressBar: false,
                                        //     closeOnClick: true,
                                        //     pauseOnHover: true,
                                        //     draggable: true,
                                        //     progress: undefined,
                                        //     });
                                        history.push("/Home");   

                                    })
                                    .catch(error => {
                                        ccToast("Something went wrong!", "danger")
                                        // toast.error('Something went wrong!', {
                                        //     position: "top-center",
                                        //     autoClose: 5000,
                                        //     hideProgressBar: false,
                                        //     closeOnClick: true,
                                        //     pauseOnHover: true,
                                        //     draggable: true,
                                        //     progress: undefined,
                                        //     });
                                    })
                                    .finally(() => actions.setSubmitting(false));
                            }}
                        >
                            {({ setFieldValue, errors, touched, values, isSubmitting }) => (
                                <Form>
                                    <DkTextbox title="Name" required value={values.name} propName="name" errors={errors.name}
                                        touched={touched.name} setFieldValue={setFieldValue} />

                                    <DkTextbox title="Surname" required value={values.surname} propName="surname"
                                        errors={errors.surname} touched={touched.surname} setFieldValue={setFieldValue} />

                                    <DkTextbox title="Email" readonly value={values.email} propName="email" errors={errors.email}
                                        touched={touched.email} setFieldValue={setFieldValue} />

                                    <div className="form-group">
                                        <button
                                            type="submit"
                                            className="dk-btn dk-btn-blue pull-left"
                                            disabled={isSubmitting}
                                        >
                                            Update
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </React.Fragment>
            )}
        </React.Fragment>
    )
}

export default MyProfile;