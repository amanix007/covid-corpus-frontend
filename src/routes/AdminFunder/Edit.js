import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import DkRadioButtons from "components/DkRadioButtons";
import DkTextbox from 'components/DkTextbox';
import { rbStatus } from 'const';
import { funderService } from 'services';

const Edit = ({ selectedItem, handleCancel, setEditEnable, reloadList }) => {
  const [message, setMessage] = React.useState(null);

  return (
    <React.Fragment>
      <Formik
        initialValues={{
          name: (selectedItem && selectedItem.name) || "",
          acronym: (selectedItem && selectedItem.acronym) || "",
          contact: (selectedItem && selectedItem.contact) || "",
          status:
            (selectedItem && selectedItem.status) || "",
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().required("Name is required"),
          acronym: Yup.string().required("Acronym is required"),
          contact: Yup.string().required("Contact is required"),
          status: Yup.string().required("Status is required"),
        })}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={(values, actions) => {
          console.log("funders onSubmit", values);
          if (selectedItem) {
            funderService.update({ ...selectedItem, name: values.name, acronym: values.acronym, contact: values.contact, status: values.status })
              .then(res => {
                reloadList();
                setEditEnable(false);
              })
              .catch(error => setMessage(error.message))
              .finally(() => actions.setSubmitting(false));
          }
          else {
            funderService.create({ name: values.name, acronym: values.acronym, contact: values.contact, status: values.status })
              .then(res => {
                actions.setSubmitting(false);
                reloadList();
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

            <DkTextbox title="Acronym" required value={values.acronym} propName="acronym" errors={errors.acronym} touched={touched.acronym} setFieldValue={setFieldValue} />

            <DkTextbox title="Contact" required value={values.contact} propName="contact" errors={errors.contact} touched={touched.contact} setFieldValue={setFieldValue} />

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

export default Edit;