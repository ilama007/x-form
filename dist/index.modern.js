import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, InputGroup, TextArea, RadioGroup, Radio, Checkbox, HTMLSelect, Button } from '@blueprintjs/core';

const styles = {
  errorMsg: {
    color: 'red',
    fontSize: 12
  }
};
function XForm({
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

  const handleSubmit = event => {
    event.preventDefault();
    setSubmitComplete(false);
    validationHandler && setErrors(validationHandler(values));
    setSubmitComplete(true);
  };

  const resetHandler = () => {
    setValues({ ...initialValues
    });
  };

  useEffect(() => {
    if (submitComplete) {
      if (Object.keys(errors).length === 0 && errors.constructor === Object) {
        successHandler(values);
      }
    }
  }, [errors, submitComplete]);

  const handleChange = event => {
    event.persist();
    const elementType = event.target.type;

    if (elementType === 'checkbox') {
      setValues(values => ({ ...values,
        [event.target.name]: event.target.checked
      }));
    } else {
      setValues(values => ({ ...values,
        [event.target.name]: event.target.value
      }));
    }
  };

  return /*#__PURE__*/React.createElement("form", {
    id: name,
    noValidate: true
  }, schema.map(obj => {
    if (obj.type === 'email' || obj.type === 'text' || obj.type === 'password' || obj.type === 'tel') {
      return /*#__PURE__*/React.createElement(FormGroup, {
        key: obj.name,
        label: obj.label,
        labelFor: `${name}__${obj.name}`,
        labelInfo: obj.labelInfo || ''
      }, /*#__PURE__*/React.createElement(InputGroup, {
        large: true,
        id: `${name}__${obj.name}`,
        name: obj.name,
        placeholder: obj.placeHolder || '',
        maxLength: obj.maxLength && obj.maxLength,
        minLength: obj.minLength && obj.minLength,
        type: obj.type,
        onChange: handleChange,
        value: values[obj.name]
      }), errors[obj.name] && /*#__PURE__*/React.createElement("p", {
        style: styles.errorMsg
      }, errors[obj.name]));
    }

    if (obj.type === 'textarea') {
      return /*#__PURE__*/React.createElement(FormGroup, {
        key: obj.name,
        label: obj.label,
        labelFor: `${name}__${obj.name}`,
        labelInfo: obj.labelInfo || ''
      }, /*#__PURE__*/React.createElement(TextArea, {
        id: `${name}__${obj.name}`,
        name: obj.name,
        text: values[obj.name],
        placeholder: obj.placeHolder || '',
        rows: obj.rows && obj.rows,
        cols: obj.cols && obj.cols,
        growVertically: true,
        large: true,
        onChange: handleChange
      }), errors[obj.name] && /*#__PURE__*/React.createElement("p", {
        style: styles.errorMsg
      }, errors[obj.name]));
    }

    if (obj.type === 'radiogroup') {
      return /*#__PURE__*/React.createElement(FormGroup, {
        key: obj.name,
        label: obj.label,
        labelInfo: obj.labelInfo || ''
      }, /*#__PURE__*/React.createElement(RadioGroup, {
        onChange: handleChange,
        name: obj.name,
        selectedValue: values[obj.name]
      }, obj.options.map((option, index) => {
        return /*#__PURE__*/React.createElement(Radio, {
          large: true,
          key: index,
          label: option.label,
          className: `${name}__radio-${obj.name}`,
          value: option.value
        });
      })), errors[obj.name] && /*#__PURE__*/React.createElement("p", {
        style: styles.errorMsg
      }, errors[obj.name]));
    }

    if (obj.type === 'checkboxgroup') {
      return /*#__PURE__*/React.createElement(FormGroup, {
        key: obj.name,
        label: obj.label,
        labelInfo: obj.labelInfo || ''
      }, obj.options.map((option, index) => {
        return /*#__PURE__*/React.createElement(Checkbox, {
          key: index,
          name: option.name,
          large: true,
          checked: values[option.name],
          onChange: handleChange
        }, option.label);
      }), errors[obj.name] && /*#__PURE__*/React.createElement("p", {
        style: styles.errorMsg
      }, errors[obj.name]));
    }

    if (obj.type === 'selectlist') {
      return /*#__PURE__*/React.createElement(FormGroup, {
        key: obj.name,
        label: obj.label,
        labelInfo: obj.labelInfo || ''
      }, /*#__PURE__*/React.createElement(HTMLSelect, {
        name: obj.name,
        options: obj.options,
        large: true,
        value: values[obj.name],
        onChange: handleChange
      }), errors[obj.name] && /*#__PURE__*/React.createElement("p", {
        style: styles.errorMsg
      }, errors[obj.name]));
    }
  }), /*#__PURE__*/React.createElement(FormGroup, null, ' ', /*#__PURE__*/React.createElement(Button, {
    className: "btn-submit",
    onClick: handleSubmit,
    disabled: disableButtons
  }, okButtonTitle || 'SEND'), showResetButton && /*#__PURE__*/React.createElement(Button, {
    className: "btn-reset",
    disabled: disableButtons,
    onClick: resetHandler
  }, "RESET")));
}
XForm.propTypes = {
  name: PropTypes.string,
  schema: PropTypes.array.isRequired,
  initialValues: PropTypes.object.isRequired,
  validationHandler: PropTypes.func.isRequired,
  successHandler: PropTypes.func.isRequired,
  disableButtons: PropTypes.bool,
  okButtonTitle: PropTypes.string,
  showResetButton: PropTypes.bool
};

export default XForm;
//# sourceMappingURL=index.modern.js.map
