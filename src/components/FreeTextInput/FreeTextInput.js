import React from "react";
import ValidationError from "../ValidationError";

const FreeTextInput = ({
  inputName,
  fieldTitle,
  placeholder,
  values,
  errors,
  touched,
  setFieldValue,
  max,
}) => {

  const addItem = (content) => {
    let x = values;
    x.push(content);
    setFieldValue(inputName, x);
  }

  const removeItem = (content) => {
    let x = values;
    x.splice(x.indexOf(content), 1);
    setFieldValue(inputName, x);
  }

  return (
    <React.Fragment>
      <div className="form-group col-12">
        <div className="fieldTitle">{fieldTitle}</div>
        <input
          className="form-control"
          placeholder={placeholder}
          disabled={values.length >= max}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              addItem(event.target.value);
              event.target.value = "";
            }
          }}
        />

        <div className="mt-1">
          <div class="rbt-input-wrapper">
            {values &&
              values.map((c) => (
                <div tabindex="0" class="rbt-token rbt-token-removeable dk-rbt-token-removable">
                  {c}
                  <button
                    tabindex="-1"
                    aria-label="Remove"
                    class="close rbt-close rbt-token-remove-button dk-rbt-token-remove-button"
                    type="button"
                    onClick={() => removeItem({ c })}
                  >
                    <span aria-hidden="true">×</span>
                    <span class="sr-only">Remove</span>
                  </button>
                </div>
              ))}
          </div>
        </div>
        {errors && touched ? (
          <ValidationError message={errors} />
        ) : null}
      </div>
    </React.Fragment>
  );
};

export default FreeTextInput;
