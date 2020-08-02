import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import DkRadioButtons from "components/DkRadioButtons";
import DkTextbox from 'components/DkTextbox';
import { rbStatus } from 'const';
import { whoPriorityCategoryService } from "../../services";

const EditCategory = ({ editionId, selectedItem, handleCancel, handleFinalizeEditing }) => {
  const [message, setMessage] = React.useState(null);

  return (
    <React.Fragment>
      <h3>Priority Category Administration</h3>
      <Formik
        initialValues={{
          name: (selectedItem && selectedItem.name) || "",
          code: (selectedItem && selectedItem.code) || "",
          status: (selectedItem && selectedItem.status) || "",
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().required("Name is required"),
          code: Yup.string().required("Code is required"),
          status: Yup.string().required("Status is required"),
        })}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={(values, actions) => {
          console.log("category edit onSubmit", values);
          if (selectedItem) {
            whoPriorityCategoryService.update({ ...selectedItem, editionId, name: values.name, code: values.code, status: values.status })
              .then(res => {
                handleFinalizeEditing(true);
              })
              .catch(error => setMessage(error.message))
              .finally(() => actions.setSubmitting(false));
          } else {
            whoPriorityCategoryService.create({ editionId, name: values.name, code: values.code, status: values.status })
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
            { console.log("category", values)}
            <DkTextbox title="Code" required value={values.code} propName="code" errors={errors.code} touched={touched.code} setFieldValue={setFieldValue} />

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
