import React from "react";
import ValidationError from "components/ValidationError";
import { FormGroup, Input, Label } from "reactstrap";
import { Radio, RadioGroup, FormControlLabel } from "@material-ui/core";

/*
  options: list of radiobuttons { value, name }
*/
const DkRadioButtons = ({
  title,
  rbName,
  options,
  setFieldValue,
  errors,
  touched,
  selectedValue,
  required,
  readonly,
  disabled
}) => {
  const handleChange = (event) => {
    setFieldValue(rbName, event.target.value);
  };
  
  return (
    <React.Fragment>
      <FormGroup>
        <Label htmlFor={rbName}>{title}{required && <span className="required"> *</span>}</Label>
     
        {options &&
            options.map((rb) => {
              return (
                <div class="form-check form-check-inline" key={rb.value}>
                  <input
                    class="form-check-input"
                    disabled={disabled}
                    type="radio"
                    name={rbName}
                    id={`${rbName}-${rb.value}`}
                    value={rb.value}
                    checked={rb.value === selectedValue}
                    onChange={e => setFieldValue(rbName, rb.value)}
                  />
                  <label class="form-check-label" htmlFor={`${rbName}-${rb.value}`}>
                    {rb.name}
                  </label>
                </div>
              );
            })}
        {errors && touched ? (
          <>
            <br />
            <ValidationError message={errors} />
          </>
        ) : null}
      </FormGroup>
    </React.Fragment>
  );
};

export default DkRadioButtons;
