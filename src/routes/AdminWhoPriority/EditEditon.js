import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import DkTextbox from 'components/DkTextbox';
import DkRadioButtons from 'components/DkRadioButtons';
import { rbStatus } from 'const';
import { whoPriorityEditionService } from "../../services";

const EditEditon = ({ selectedItem, handleCancel, handleFinalizeEditing, getEditions }) => {
  const [message, setMessage] = React.useState(null);

  return (
    <React.Fragment>
      <h3>Edition Administration</h3>
      <Formik
        initialValues={{
          title: (selectedItem && selectedItem.title) || "",
          edition: (selectedItem && selectedItem.edition) || "",
          link: (selectedItem && selectedItem.link) || "",
          status: (selectedItem && selectedItem.status) || "",
        }}
        validationSchema={Yup.object().shape({
          title: Yup.string().required("Title is required"),
          edition: Yup.string().required("Edition is required"),
          link: Yup.string().required("Link is required"),
          status: Yup.string().required("Status is required"),
        })}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={(values, actions) => {
          console.log("edition edit onSubmit", values);
          if (selectedItem) {
            whoPriorityEditionService.update({ ...selectedItem, title: values.title, edition: values.edition, link: values.link, status: values.status })
              .then(res => {
                getEditions(false);
                handleFinalizeEditing(true);
              })
              .catch(error => setMessage(error.message))
              .finally(() => actions.setSubmitting(false));
          } else {
            whoPriorityEditionService.create({ title: values.title, edition: values.edition, link: values.link })
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

            <DkTextbox title="Title" required propName="title" value={values.title} setFieldValue={setFieldValue} errors={errors.title} touched={touched.title} />

            <DkTextbox title="Edition" required propName="edition" value={values.edition} setFieldValue={setFieldValue} errors={errors.edition} touched={touched.edition} />

            <DkTextbox title="Link" required propName="link" value={values.link} setFieldValue={setFieldValue} errors={errors.link} touched={touched.link} />

            <DkRadioButtons
              title="Status"
              rbName="status"
              options={rbStatus}
              setFieldValue={setFieldValue}
              errors={errors.status}
              touched={touched.status}
              selectedValue={values.status}
            />
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

export default EditEditon;
