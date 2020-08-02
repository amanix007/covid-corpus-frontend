import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import ValidationError from "components/ValidationError";
import DkRadioButtons from "components/DkRadioButtons";
import DkTextbox from 'components/DkTextbox';
import { rbStatus } from 'const';
import { hrcsResearchActivitySubcategory } from 'services';

const EditSubcategory = ({ categoryId, selectedItem, handleCancel, handleFinalizeEditing }) => {
  const [message, setMessage] = React.useState(null);

  return (
    <React.Fragment>
      <h3>Subcategory Administration</h3>
      <Formik
        initialValues={{
          code: (selectedItem && selectedItem.code) || "",
          full_name: (selectedItem && selectedItem.full_name) || "",
          short_name: (selectedItem && selectedItem.short_name) || "",
          unique_id: (selectedItem && selectedItem.unique_id) || "",
          link: (selectedItem && selectedItem.link) || "",
          status: (selectedItem && selectedItem.status) || "",
        }}
        validationSchema={Yup.object().shape({
          code: Yup.string().required("Code is required"),
          full_name: Yup.string().required("Full Name is required"),
          short_name: Yup.string().required("Short Name is required"),
          unique_id: Yup.string().required("Unique Id is required"),
          link: Yup.string().required("Link is required"),
          status: Yup.string().required("Status is required"),
        })}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={(values, actions) => {
          console.log("subcategory edit onSubmit", values);
          if (selectedItem) {
            hrcsResearchActivitySubcategory.update({
              id: selectedItem.id,
              categoryId,
              code: values.code,
              full_name: values.full_name,
              short_name: values.short_name,
              unique_id: values.unique_id,
              link: values.link,
              status: values.status
            })
              .then(res => {
                handleFinalizeEditing(true);
              })
              .catch(error => setMessage(error.message))
              .finally(() => actions.setSubmitting(false));
          } else {
            hrcsResearchActivitySubcategory.create({
              categoryId,
              code: values.code,
              full_name: values.full_name,
              short_name: values.short_name,
              unique_id: values.unique_id,
              link: values.link,
              status: values.status
            })
              .then(res => {
                handleFinalizeEditing(true);
              })
              .catch(error => setMessage(error.message))
              .finally(() => actions.setSubmitting(false));
          }
        }}
      >
        {({ setFieldValue, errors, touched, values, isSubmitting }) => (
          <Form>
            <DkTextbox title="Code" required value={values.code} propName="code" errors={errors.code} touched={touched.code} setFieldValue={setFieldValue} />

            <DkTextbox title="Full Name" required value={values.full_name} propName="full_name" errors={errors.full_name} touched={touched.full_name} setFieldValue={setFieldValue} />

            <DkTextbox title="Short Name" required value={values.short_name} propName="short_name" errors={errors.short_name} touched={touched.short_name} setFieldValue={setFieldValue} />

            <DkTextbox title="Unique Id" required value={values.unique_id} propName="unique_id" errors={errors.unique_id} touched={touched.unique_id} setFieldValue={setFieldValue} />

            <DkTextbox title="Link" required value={values.link} propName="link" errors={errors.link} touched={touched.link} setFieldValue={setFieldValue} />

            <DkRadioButtons
              title="Status"
              rbName="status"
              options={rbStatus}
              setFieldValue={setFieldValue}
              errors={errors.status}
              touched={touched.status}
              selectedValue={values.status}
            />

            {/* {message && <div className="form-group"><ValidationError message={message} /></div>} */}

            <div className="form-group">
              <button
                type="submit"
                className="dk-btn dk-btn-blue pull-left"
                disabled={isSubmitting}
              >
                {(selectedItem && "Update") || "Submit"}
              </button>
              <button
                href="#"
                className="dk-btn dk-btn-link pull-left ml-3"
                disabled={isSubmitting}
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </React.Fragment>
  );
};

export default EditSubcategory;
