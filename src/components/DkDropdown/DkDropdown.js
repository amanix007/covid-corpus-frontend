import React from 'react';
import ValidationError from 'components/ValidationError';
import { Input, FormGroup, Label } from 'reactstrap';
import InfoIcon from 'components/InfoIcon';

const DkDropdown = ({ title, propName, list, selectedValue, errors, touched, setFieldValue, required, disabled, readonly, onChange, infoId }) => {
  console.log('selectedValue', selectedValue);
  return (
    <FormGroup>
      <Label className="fieldTitle" for={propName}>{title}{required && <span className="required"> *</span>}</Label>
      <div className="inline-form">
        <Input type="select"  style={{ overflow: 'hidden !important' }}
          disabled={disabled}
          onChange={onChange || ((e) => setFieldValue && setFieldValue(propName, e.target.value))}>
        <option value="-1">{`- Select ${title} -`}</option>
          {list && list.map((x) => (
            <option key={x.value}
              value={x.value}
              selected={x.value === selectedValue}
            >              
              {x.name}
            </option>
          ))}
          </Input>
        {infoId && (
          <InfoIcon infoId={infoId} />
        )}
      </div>
      {errors && touched ? <ValidationError message={errors} /> : null}
    </FormGroup>
  );
};

export default DkDropdown;