import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  FormGroup,
  InputGroup,
  TextArea,
  RadioGroup,
  Radio,
  Checkbox,
  HTMLSelect,
  Button,
  Intent
} from '@blueprintjs/core';
import '@blueprintjs/core/lib/css/blueprint.css';

const styles = {
  errorMsg: {
    color: 'red',
    fontSize: 12
  }
};

export default function XForm({
  name,
  okButtonTitle,
  showResetButton,
  schema,
  initialValues,
  validationHandler,
  successHandler,
  disableButtons
}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submitComplete, setSubmitComplete] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitComplete(false);
    validationHandler && setErrors(validationHandler(values));
    setSubmitComplete(true);
  };

  const resetHandler = () => {
    setValues({ ...initialValues });
  };

  useEffect(() => {
    if (submitComplete) {
      if (Object.keys(errors).length === 0 && errors.constructor === Object) {
        successHandler(values);
      }
    }
  }, [errors, submitComplete]);

  const handleChange = (event) => {
    event.persist();
    const elementType = event.target.type;
    if (elementType === 'checkbox') {
      setValues((values) => ({
        ...values,
        [event.target.name]: event.target.checked
      }));
    } else {
      setValues((values) => ({
        ...values,
        [event.target.name]: event.target.value
      }));
    }
  };

  return (
    <form id={name} noValidate>
      {schema.map((obj) => {
        if (
          obj.type === 'email' ||
          obj.type === 'text' ||
          obj.type === 'password' ||
          obj.type === 'tel'
        ) {
          return (
            <FormGroup
              key={obj.name}
              label={obj.label}
              labelFor={`${name}__${obj.name}`}
              labelInfo={obj.labelInfo || ''}
            >
              <InputGroup
                large
                id={`${name}__${obj.name}`}
                name={obj.name}
                placeholder={obj.placeHolder || ''}
                maxLength={obj.maxLength && obj.maxLength}
                minLength={obj.minLength && obj.minLength}
                type={obj.type}
                onChange={handleChange}
                value={values[obj.name]}
              />
              {errors[obj.name] && (
                <p style={styles.errorMsg}>{errors[obj.name]}</p>
              )}
            </FormGroup>
          );
        }

        if (obj.type === 'textarea') {
          return (
            <FormGroup
              key={obj.name}
              label={obj.label}
              labelFor={`${name}__${obj.name}`}
              labelInfo={obj.labelInfo || ''}
            >
              <TextArea
                id={`${name}__${obj.name}`}
                name={obj.name}
                text={values[obj.name]}
                placeholder={obj.placeHolder || ''}
                rows={obj.rows && obj.rows}
                cols={obj.cols && obj.cols}
                growVertically
                large
                onChange={handleChange}
              />
              {errors[obj.name] && (
                <p style={styles.errorMsg}>{errors[obj.name]}</p>
              )}
            </FormGroup>
          );
        }

        if (obj.type === 'radiogroup') {
          return (
            <FormGroup
              key={obj.name}
              label={obj.label}
              labelInfo={obj.labelInfo || ''}
            >
              <RadioGroup
                onChange={handleChange}
                name={obj.name}
                selectedValue={values[obj.name]}
              >
                {obj.options.map((option, index) => {
                  return (
                    <Radio
                      large
                      key={index}
                      label={option.label}
                      className={`${name}__radio-${obj.name}`}
                      value={option.value}
                    />
                  );
                })}
              </RadioGroup>
              {errors[obj.name] && (
                <p style={styles.errorMsg}>{errors[obj.name]}</p>
              )}
            </FormGroup>
          );
        }

        if (obj.type === 'checkboxgroup') {
          return (
            <FormGroup
              key={obj.name}
              label={obj.label}
              labelInfo={obj.labelInfo || ''}
            >
              {obj.options.map((option, index) => {
                return (
                  <Checkbox
                    key={index}
                    name={option.name}
                    large
                    checked={values[option.name]}
                    onChange={handleChange}
                  >
                    {option.label}
                  </Checkbox>
                );
              })}
              {errors[obj.name] && (
                <p style={styles.errorMsg}>{errors[obj.name]}</p>
              )}
            </FormGroup>
          );
        }

        if (obj.type === 'selectlist') {
          return (
            <FormGroup
              key={obj.name}
              label={obj.label}
              labelInfo={obj.labelInfo || ''}
            >
              <HTMLSelect
                name={obj.name}
                options={obj.options}
                large
                value={values[obj.name]}
                onChange={handleChange}
              />
              {errors[obj.name] && (
                <p style={styles.errorMsg}>{errors[obj.name]}</p>
              )}
            </FormGroup>
          );
        }
      })}
      <FormGroup>
        {' '}
        <Button
          className='btn-submit'
          onClick={handleSubmit}
          disabled={disableButtons}
          intent={Intent.PRIMARY}
        >
          {okButtonTitle || 'SEND'}
        </Button>
        {showResetButton && (
          <Button
            className='btn-reset'
            disabled={disableButtons}
            onClick={resetHandler}
          >
            RESET
          </Button>
        )}
      </FormGroup>
    </form>
  );
}

XForm.propTypes = {
  /**
   * Name and id of the form. Optional but recommended for style namespacing purposes when
   * more than one form is rendered in a single page.
   * */
  name: PropTypes.string,
  /**
   * Schema of the form. Refer the example how it is defined
   */
  schema: PropTypes.array.isRequired,
  /**
   * Initial value passed to the schema. The keys will be based upon the name of the field in the
   * schema. Refer to the example.
   */
  initialValues: PropTypes.object.isRequired,
  /**
   * Function that will compose appropriate error messages for the form.
   */
  validationHandler: PropTypes.func.isRequired,
  /**
   * Function that will execute when all data are validated. This will return a valid JSON data which
   * can be fed to API post/get request using appropriate http methods.
   */
  successHandler: PropTypes.func.isRequired,
  /**
   * Boolean flag that will enable/disable buttons. This can be used to turn on and off while data request is
   * being processed.
   */
  disableButtons: PropTypes.bool,
  /**
   * This sets the title of the submit button. It can be used to change text when data is being processed.
   */
  okButtonTitle: PropTypes.string,
  /**
   * This boolean flag will hide/show reset button
   */
  showResetButton: PropTypes.bool
};
