import React from "react";
import { Field } from "formik";
import ValidationError from "components/ValidationError";
import { FormGroup, Label } from "reactstrap";
import { Radio, RadioGroup, FormControlLabel } from "@material-ui/core";

/*
  options: list of radiobuttons { value, name }
*/
const RadioButtons = ({
  title,
  rbName,
  options,
  setFieldValue,
  errors,
  touched,
  selectedValue,
}) => {
  const handleChange = (event) => {
    setFieldValue(rbName, event.target.value);
  };

  console.log('rbvalues', options, selectedValue);
  return (
    <React.Fragment>
      <FormGroup>
        <Label className="fieldTitle" for={rbName}>{title}</Label>
        <RadioGroup
          row
          aria-label={rbName}
          name={rbName}
          id={rbName}
          value={selectedValue}
          onChange={handleChange}
        >
          {options &&
            options.map((rb) => {
              return (
                <FormControlLabel
                  key={rb.value}
                  value={rb.value}
                  control={<Radio color="primary" />}
                  label={rb.name}
                />
              );
            })}
        </RadioGroup>
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

export default RadioButtons;
