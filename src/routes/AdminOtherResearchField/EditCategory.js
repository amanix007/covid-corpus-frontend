import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import DkRadioButtons from "components/DkRadioButtons";
import DkTextbox from 'components/DkTextbox';
import { rbStatus } from 'const';
import { otherResearchFieldCategory } from 'services';

const EditCategory = ({ selectedItem, handleCancel, handleFinalizeEditing }) => {
  const [message, setMessage] = React.useState(null);
  
  return (
    <React.Fragment>
      <h3>Other Research Field Administration</h3>
      <Formik
        initialValues={{
          name: (selectedItem && selectedItem.name) || "",
          status: (selectedItem && selectedItem.status) || "",
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().required("Name is required"),
          status: Yup.string().required("Status is required"),
        })}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={(values, actions) => {
          console.log("category edit onSubmit", values);
          actions.setSubmitting(false);
          if (selectedItem) {
            otherResearchFieldCategory.update({
              id: selectedItem.id,
              name: values.name,
              status: values.status
          })
              .then(res => {
                handleFinalizeEditing(true);
              })
              .catch(error => setMessage(error.message))
              .finally(() => actions.setSubmitting(false));
          } else {
            otherResearchFieldCategory.create({ 
              name: values.name,
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
            <DkTextbox title="Name" required value={values.name} propName="name" errors={errors.name} touched={touched.name} setFieldValue={setFieldValue} />

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

export default EditCategory;
