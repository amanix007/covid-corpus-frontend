import React from 'react';
import { Link } from 'react-router-dom';
import AdminMenu from 'components/AdminMenu/AdminMenu';
import { Formik, Form, Field } from "formik";
import ValidationError from 'components/ValidationError';
import StatusRadio from '../Admin/Components/StatusRadio';
import * as Yup from "yup";
import { blogCategoryService } from '../../services';

const ValidationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    status: Yup.string().required("Status is required")
});

const AdminBlogCategory = () => {
    const [message, setMessage] = React.useState(null);
    const [blogCategory, setBlogCategory] = React.useState(null);
    const [editEnable, setEditEnable] = React.useState(false);
    const [selectedItem, setSelectedItem] = React.useState(null);

    React.useEffect(() => {
        blogCategoryService.get().then(data => setBlogCategory(data));
    }, []);

    const handleEdit = (id) => {
        blogCategoryService.getById(id).then(item => {
            setSelectedItem(item);
            setEditEnable(true);
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
                            {!editEnable && (
                                <div className="text-right">
                                    <button className="sj-btn sj-btnactive" onClick={handleNew}>New</button>
                                </div>
                            )}
                            {!blogCategory && !editEnable && ('No Blog Categories yet')}
                            {blogCategory && !editEnable && (
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
                                        {blogCategory.map(x => {
                                            return (<tr key={x.id}>
                                                <td>
                                                    {x.name}
                                                </td>
                                                <td className="text-center">
                                                    {x.status}
                                                </td>
                                                <td className="text-center">
                                                    <Link onClick={(e) => handleEdit(x.id)}>Edit</Link>
                                                </td>
                                            </tr>)
                                        })}
                                    </tbody>
                                </table>
                            )}

                            {editEnable && (
                                <React.Fragment>
                                    <h3>Blog Category Administration</h3>
                                    <Formik
                                        initialValues={{
                                            name: (selectedItem && selectedItem.name) || '',
                                            status: (selectedItem && selectedItem.status) || "",
                                        }}
                                        validationSchema={ValidationSchema}
                                        validateOnChange={false}
                                        validateOnBlur={false}
                                        onSubmit={(values) => {
                                            // same shape as initial values
                                            setMessage("Invalid email or password");
                                            console.log(values);
                                        }}
                                    >
                                        {({ setFieldValue, errors, touched, values }) => (
                                            <Form>
                                                <div className="form-group">
                                                    <Field name="name" className="form-control" placeholder="Name..." />
                                                    {errors.name && touched.name ? <ValidationError message={errors.name} /> : null}
                                                </div>

                                                <StatusRadio values={values} setFieldValue={setFieldValue} errors={errors} touched={touched} />

                                                {message && (
                                                    <ValidationError message={message} />
                                                )}                                                

                                                <button type="submit" className="sj-btn sj-btnactive mr-3">
                                                    {selectedItem && 'Update' || 'Submit'}
                                                </button>

                                                <a href="#" onClick={handleCancel}>
                                                    Cancel
                                                </a>
                                            </Form>
                                        )}
                                    </Formik>
                                </React.Fragment>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default AdminBlogCategory;