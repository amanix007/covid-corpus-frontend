import React from "react";
import { Field } from "formik";
import ValidationError from "components/ValidationError";

const StatusRadio = ({setFieldValue, errors, touched, values}) => {  
  return (
    <div className="form-group">
      <div className="sj-radio radio-inline">
        <Field
          type="radio"
          id="statusActive"
          name="status"
          defaultChecked={values.status === 'A'}
          disabled={false}
          value='A'
          onChange={() => setFieldValue("status", 'A')}
        />
        <label htmlFor="statusActive" className="mr-3">
          Active
        </label>

        <Field
          type="radio"
          id="statusInactive"
          name="status"
          defaultChecked={values.status === 'I'}
          value='I'
          onChange={() => setFieldValue("status", 'I')}
        />
        <label htmlFor="statusInactive">Inactive</label>
      </div>
      {errors.status && touched.status ? (
        <>
        <br />
        <ValidationError message={errors.status} />
        </>
      ) : null}
    </div>
  );
};

export default StatusRadio;