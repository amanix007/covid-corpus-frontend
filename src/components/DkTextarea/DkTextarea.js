import React from 'react';
import ValidationError from 'components/ValidationError';
import { Input, FormGroup, Label } from 'reactstrap';

const DkTextarea = ({ title, value, propName, errors, touched, setFieldValue, required, disabled, 
    readonly, onChange, infoId, rows, placeholder }) => {
  return (
    <FormGroup>
      <Label className="fieldTitle" for={propName}>{title}{required && <span className="required"> *</span>}</Label>
      <Input
        type="textarea"
        name={propName}
        id={propName}
        placeholder={placeholder}
        value={value}
        onChange={onChange || ((e) => setFieldValue && setFieldValue(propName, e.target.value))}
        disabled={disabled}
        readOnly={readonly}
        rows={rows}
      />
      {errors && touched ? <ValidationError message={errors} /> : null}
    </FormGroup>
  );
};

export default DkTextarea;