import React from 'react';
import ValidationError from 'components/ValidationError';
import { Input, FormGroup, Label } from 'reactstrap';
import InfoIcon from 'components/InfoIcon';


const DkTextbox = ({ title, value, propName, errors, touched, setFieldValue, required, disabled, readonly, onChange, infoId }) => {
  return (
    <FormGroup>
      <Label className="fieldTitle" for={propName}>{title}{required && <span className="required"> *</span>}</Label>
      <div className="inline-form">        
        <Input
          type="text"
          name={propName}
          id={propName}
          placeholder={title}
          value={value}
          onChange={onChange || ((e) => setFieldValue && setFieldValue(propName, e.target.value))}
          disabled={disabled}
          readOnly={readonly}
        />
        {infoId && (
          <InfoIcon infoId={infoId} />
        )}
      </div>
      {errors && touched ? <ValidationError message={errors} /> : null}
    </FormGroup>
  );
};

export default DkTextbox;