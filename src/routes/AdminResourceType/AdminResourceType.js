import React from 'react';
import { Link } from 'react-router-dom';
import Loading from 'components/Loading';
import AdminMenu from 'components/AdminMenu/AdminMenu';
import DkRadioButtons from "components/DkRadioButtons";
import { Formik, Form, Field } from "formik";
import ValidationError from 'components/ValidationError';
import * as Yup from "yup";
import { rbStatus } from 'const';
import { resourceLabelService } from 'services';

const ValidationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    status: Yup.string().required("Status is required")
});

const AdminResourceType = () => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [message, setMessage] = React.useState(null);
    const [resourceLabels, setResourceLabels] = React.useState(null);
    const [editEnable, setEditEnable] = React.useState(false);
    const [selectedItem, setSelectedItem] = React.useState(null);
    const [selectedItemId, setSelectedItemId] = React.useState(null);

    React.useEffect(() => {
        loadResourceTypes();
    }, []);

    const loadResourceTypes = () => {
        setIsLoading(true);
        resourceLabelService.get().then(data => {
            setResourceLabels(data);
            setIsLoading(false);
        });
    }

    const handleEdit = (id) => {
        setIsLoading(true);
        resourceLabelService.getById(id).then(item => {
            setSelectedItem(item);
            setSelectedItemId(id);
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

    return (
        <main id="sj-main" className="sj-main sj-haslayout">
            <div className="sj-content">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-sm-12 col-md-5 col-lg-3">
                            <AdminMenu />
                        </div>
                        <div className="col-12 col-sm-12 col-md-7 col-lg-9 table-responsive">
                            <div className="dk-page-title">Resource Type Administration</div>

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
                                    {!resourceLabels && !editEnable && ('No Resource Types yet')}
                                    {resourceLabels && !editEnable && (
                                        <table className="table table-striped mt-3">
                                            <thead>
                                                <tr>
                                                    <th>
                                                        Name
                                            </th>
                                                    <th className="text-center">
                                                        Status
                                            </th>
                                                    <th>

                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {resourceLabels.map(x => {
                                                    return (<tr key={x.resource_label_id}>
                                                        <td>
                                                            {x.name}
                                                        </td>
                                                        <td className="text-center">
                                                            {x.status}
                                                        </td>
                                                        <td className="text-right">
                                                            <button onClick={(e) => handleEdit(x.resource_label_id)} className="list-link">Edit</button>
                                                        </td>
                                                    </tr>)
                                                })}
                                            </tbody>
                                        </table>
                                    )}

                                    {editEnable && (
                                        <React.Fragment>
                                            <h3>Resource Type Administration</h3>
                                            <Formik
                                                initialValues={{
                                                    id: (selectedItem && selectedItemId) || '',
                                                    name: (selectedItem && selectedItem.name) || '',
                                                    status: (selectedItem && selectedItem.status) || "",
                                                }}
                                                validationSchema={ValidationSchema}
                                                validateOnChange={false}
                                                validateOnBlur={false}
                                                onSubmit={(values) => {
                                                    setIsLoading(true);
                                                    if (selectedItemId == null || selectedItemId == '') {
                                                        resourceLabelService.insertResourceType({
                                                            name: values.name,
                                                            status: values.status
                                                        })
                                                        .then(data => {
                                                            loadResourceTypes();
                                                            setEditEnable(false);
                                                        })
                                                    }
                                                    if (selectedItemId != null && selectedItemId != '') {
                                                        resourceLabelService.updateResourceType({
                                                            id: selectedItemId,
                                                            name: values.name,
                                                            status: values.status
                                                        })
                                                        .then(data => {
                                                            loadResourceTypes();
                                                            setEditEnable(false);
                                                        })
                                                    }
                                                }}
                                            >
                                                {({ setFieldValue, errors, touched, values, isSubmitting }) => (
                                                    <Form>
                                                        <div className="form-group">
                                                            <div className="fieldTitle">Name</div>
                                                            <Field name="name" className="form-control" placeholder="Name..." />
                                                            {errors.name && touched.name ? <ValidationError message={errors.name} /> : null}
                                                        </div>

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

                                                        <button type="submit" className="dk-btn dk-btn-blue pull-left" >
                                                            {(selectedItem && "Update") || "Submit"}
                                                        </button>
                                                        <button href="#" className="dk-btn dk-btn-link pull-left ml-3" onClick={handleCancel}>
                                                            Cancel
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

export default AdminResourceType;