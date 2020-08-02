import React from 'react';
import Loading from 'components/Loading';
import AdminMenu from 'components/AdminMenu/AdminMenu';
import { Formik, Form, Field } from "formik";
import ValidationError from 'components/ValidationError';
import DkRadioButtons from "components/DkRadioButtons";
import DkTextbox from 'components/DkTextbox';
import ImageUpload from 'components/ImageUpload';
import * as Yup from "yup";
import { rbStatus } from 'const';
import { partnerService } from 'services';

const ValidationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    link: Yup.string().required("Link is required"),
});

const AdminPartner = () => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [message, setMessage] = React.useState(null);
    const [partners, setPartners] = React.useState(null);
    const [editEnable, setEditEnable] = React.useState(false);
    const [selectedItem, setSelectedItem] = React.useState(null);

    React.useEffect(() => {

    }, []);

    React.useEffect(() => {
        if (!editEnable)
            loadPartners();
    }, [editEnable]);

    const loadPartners = () => {
        partnerService.get().then(data => {
            setPartners(data);
            setIsLoading(false);
        });
    }

    const handleEdit = (id) => {
        setIsLoading(true);
        partnerService.getById(id).then(item => {
            setSelectedItem(item);
            setEditEnable(true);
            setIsLoading(false);
        });
    }

    const handleNew = (e) => {
        e.preventDefault();
        setEditEnable(true);
    }

    const handleCancel = (e) => {
        e.preventDefault();
        setSelectedItem(null);
        setEditEnable(false);
    }

    const handleDelete = (e) => {
        setIsLoading(true);
        partnerService.deleteItem(selectedItem.id).then(item => {
            setEditEnable(false);
            setIsLoading(false);
        });
    }

    return (
        <main id="sj-main" className="sj-main sj-haslayout">
            <div className="sj-content">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-sm-12 col-md-5 col-lg-3">
                            <AdminMenu />
                        </div>
                        <div className="col-12 col-sm-12 col-md-7 col-lg-9 table-responsive">
                            <div className="dk-page-title">Partner Administration</div>

                            {!editEnable && (
                                <div className="mb-3 clearfix">
                                    <button className="dk-btn dk-btn-blue pull-right" onClick={handleNew}>New</button>
                                </div>
                            )}

                            {isLoading && (
                                <Loading />
                            )}

                            {!isLoading && (
                                <React.Fragment>
                                    {console.log('data', partners)}
                                    {partners && partners.length == 0 && !editEnable && ('No Partners yet')}
                                    {partners && partners.length > 0 && !editEnable && (
                                        <table className="table table-striped mt-3">
                                            <thead>
                                                <tr>
                                                    <th>
                                                        Name
                                                    </th>
                                                    <th className="text-center">Status</th>
                                                    <th>

                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {partners.map(x => {
                                                    return (<tr key={x.id}>
                                                        <td>
                                                            {x.name}
                                                        </td>
                                                        <td className="text-center">{x.status}</td>
                                                        <td className="text-right">
                                                            <button onClick={(e) => handleEdit(x.id)} className="list-link">Edit</button>
                                                        </td>
                                                    </tr>)
                                                })}
                                            </tbody>
                                        </table>
                                    )}

                                    {editEnable && (
                                        <React.Fragment>
                                            <Formik
                                                initialValues={{
                                                    name: (selectedItem && selectedItem.name) || '',
                                                    link: (selectedItem && selectedItem.link) || '',
                                                    logo: (selectedItem && selectedItem.logo) || null,
                                                    img: null,
                                                    status: (selectedItem && selectedItem.status) || ''
                                                }}
                                                validationSchema={ValidationSchema}
                                                validateOnChange={false}
                                                validateOnBlur={false}
                                                onSubmit={(values, actions) => {
                                                    actions.setSubmitting(true);
                                                    if (selectedItem) {
                                                        partnerService.update({ id: selectedItem.id, name: values.name, link: values.link, status: values.status })
                                                            .then(res => {
                                                                setEditEnable(false);
                                                            })
                                                            .catch(error => setMessage(error.message))
                                                            .finally(() => actions.setSubmitting(false));
                                                    }
                                                    else {
                                                        partnerService.create({ name: values.name, link: values.link })
                                                            .then(res => {
                                                                setEditEnable(false);
                                                            })
                                                            .catch(error => setMessage(error.message))
                                                            .finally(() => actions.setSubmitting(false));

                                                    }
                                                }}
                                            >
                                                {({ setFieldValue, errors, touched, values, isSubmitting }) => (
                                                    <Form>
                                                        <DkTextbox title="Name" required value={values.name} propName="name" errors={errors.name} touched={touched.name} setFieldValue={setFieldValue} />

                                                        <DkTextbox title="Link" required value={values.link} propName="link" errors={errors.link} touched={touched.link} setFieldValue={setFieldValue} />


                                                        <ImageUpload setImage={(img) => setFieldValue('logo', img)} />

                                                        {values.logo && (
                                                            <img src={`${process.env.REACT_APP_IMAGES_PATH}${values.logo}`} height="96" />
                                                        )}

                                                        <DkRadioButtons
                                                            title="Status"
                                                            rbName="status"
                                                            options={rbStatus}
                                                            setFieldValue={setFieldValue}
                                                            errors={errors.status}
                                                            touched={touched.status}
                                                            selectedValue={values.status}
                                                        />

                                                        {message && (
                                                            <ValidationError message={message} />
                                                        )}

                                                        <button type="submit" className="dk-btn dk-btn-blue pull-left" disabled={isSubmitting}>
                                                            {(selectedItem && "Update") || "Submit"}
                                                        </button>
                                                        <button href="#" className="dk-btn dk-btn-link pull-left ml-3" disabled={isSubmitting} onClick={handleCancel}>
                                                            Cancel
                                                        </button>

                                                        <button href="#" className="dk-btn dk-btn-delete pull-right"
                                                            disabled={isSubmitting}
                                                            onClick={handleDelete}
                                                        >
                                                            Delete
                                                        </button>
                                                    </Form>
                                                )}
                                            </Formik>
                                        </React.Fragment>
                                    )}
                                </React.Fragment>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default AdminPartner;