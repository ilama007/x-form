import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, InputGroup, TextArea, RadioGroup, Radio, Checkbox, HTMLSelect, Button, Intent } from '@blueprintjs/core';
import '@blueprintjs/core/lib/css/blueprint.css';

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

var styles = {
  errorMsg: {
    color: 'red',
    fontSize: 12
  }
};
function XForm(_ref) {
  var name = _ref.name,
      okButtonTitle = _ref.okButtonTitle,
      showResetButton = _ref.showResetButton,
      schema = _ref.schema,
      initialValues = _ref.initialValues,
      validationHandler = _ref.validationHandler,
      successHandler = _ref.successHandler,
      disableButtons = _ref.disableButtons;

  var _useState = useState(initialValues),
      values = _useState[0],
      setValues = _useState[1];

  var _useState2 = useState({}),
      errors = _useState2[0],
      setErrors = _useState2[1];

  var _useState3 = useState(false),
      submitComplete = _useState3[0],
      setSubmitComplete = _useState3[1];

  var handleSubmit = function handleSubmit(event) {
    event.preventDefault();
    setSubmitComplete(false);
    validationHandler && setErrors(validationHandler(values));
    setSubmitComplete(true);
  };

  var resetHandler = function resetHandler() {
    setValues(_extends({}, initialValues));
  };

  useEffect(function () {
    if (submitComplete) {
      if (Object.keys(errors).length === 0 && errors.constructor === Object) {
        successHandler(values);
      }
    }
  }, [errors, submitComplete]);

  var handleChange = function handleChange(event) {
    event.persist();
    var elementType = event.target.type;

    if (elementType === 'checkbox') {
      setValues(function (values) {
        var _extends2;

        return _extends(_extends({}, values), {}, (_extends2 = {}, _extends2[event.target.name] = event.target.checked, _extends2));
      });
    } else {
      setValues(function (values) {
        var _extends3;

        return _extends(_extends({}, values), {}, (_extends3 = {}, _extends3[event.target.name] = event.target.value, _extends3));
      });
    }
  };

  return /*#__PURE__*/React.createElement("form", {
    id: name,
    noValidate: true
  }, schema.map(function (obj) {
    if (obj.type === 'email' || obj.type === 'text' || obj.type === 'password' || obj.type === 'tel') {
      return /*#__PURE__*/React.createElement(FormGroup, {
        key: obj.name,
        label: obj.label,
        labelFor: name + "__" + obj.name,
        labelInfo: obj.labelInfo || ''
      }, /*#__PURE__*/React.createElement(InputGroup, {
        large: true,
        id: name + "__" + obj.name,
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
        labelFor: name + "__" + obj.name,
        labelInfo: obj.labelInfo || ''
      }, /*#__PURE__*/React.createElement(TextArea, {
        id: name + "__" + obj.name,
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
      }, obj.options.map(function (option, index) {
        return /*#__PURE__*/React.createElement(Radio, {
          large: true,
          key: index,
          label: option.label,
          className: name + "__radio-" + obj.name,
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
      }, obj.options.map(function (option, index) {
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
    disabled: disableButtons,
    intent: Intent.PRIMARY
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
