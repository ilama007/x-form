# x-form

[![NPM](https://img.shields.io/npm/v/x-form.svg)](https://www.npmjs.com/package/x-form) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install ilama007/x-form
```

## Usage

Quickly scaffold a simple form UI with appropriate validations. Since it is a part of DFA web framework, it makes use of BlueprintJS UI library.

####Step 1
**Create a schema file e.g `mySchema.js` and copy the following schema.** The following schema is for demonstration purpose only so it shows all fields as required. Also it uses all available input types. Just copy what is required for your purpose.

```jsx
// Supported Types = text/textarea/password/email/tel/radiogroup/checkboxgroup/selectlist
const mySchema = [
  {
    name: 'first_name',
    label: 'First Name',
    labelInfo: '(required)',
    type: 'text',
    placeHolder: 'John',
    maxLength: 20,
    minLength: 5
  },
  {
    name: 'last_name',
    label: 'Last Name',
    labelInfo: '(required)',
    type: 'text',
    placeHolder: 'Doe',
    maxLength: 20,
    minLength: 5
  },
  {
    name: 'email',
    label: 'Email Address',
    labelInfo: '(required)',
    type: 'email',
    placeHolder: 'johndoe@email.com'
  },
  {
    name: 'confirm_email',
    label: 'Confirm Email Address',
    labelInfo: '(required)',
    type: 'email',
    placeHolder: 'johndoe@email.com'
  },
  {
    name: 'phone',
    label: 'Telephone',
    labelInfo: '(required)',
    type: 'tel',
    placeHolder: '2652651765'
  },
  {
    name: 'description',
    label: 'Description',
    labelInfo: '',
    type: 'textarea',
    placeHolder: 'This is description placeholder',
    rows: 4,
    cols: 100
  },
  {
    name: 'operating_system',
    label: 'Operating System',
    labelInfo: '',
    type: 'radiogroup',
    options: [
      { label: 'Mac', value: 'mac' },
      { label: 'Windows', value: 'windows' }
    ]
  },
  {
    name: 'mode_of_communication',
    label: 'Choose your mode of communications',
    labelInfo: 'Multi choice. At least one is required',
    type: 'checkboxgroup',
    options: [
      { name: 'moc_email', label: 'Via Email' },
      { name: 'moc_phone', label: 'Contact Via Phone' },
      { name: 'moc_mail', label: 'Traditional Mail' }
    ]
  },
  {
    name: 'us_states',
    label: 'Select your state',
    labelInfo: '(Required)',
    type: 'selectlist',
    options: [
      { label: 'Choose', value: '' },
      { label: 'Pennsylvania', value: 'PA' },
      { label: 'Virginia', value: 'VA' },
      { label: 'New York', value: 'NY' }
    ]
  }
];

export { mySchema };
```

####Step 2
**Create a validation method** You can create a separate file for validation but for the demostration purpose lets keep it in the `mySchema.js`. Copy following codes after `mySchema` object.

```jsx
const mySchema = [.....

//....place it here
const myValidation = (values) => {
  let errors = {};
  if (!values.first_name) {
    errors.first_name = '↑ First Name is required.';
  }
  if (!values.last_name) {
    errors.last_name = '↑ Last Name is required.';
  }
  if (!values.phone) {
    errors.phone = '↑ Phone Number is required.';
  }
  if (!values.email) {
    errors.email = '↑ Email Address is required.';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = '↑ Email Address is invalid.';
  }
  if (!values.confirm_email) {
    errors.confirm_email = '↑ Confirm Email Address is required.';
  } else if (!/\S+@\S+\.\S+/.test(values.confirm_email)) {
    errors.confirm_email = '↑ Confirm Email Address is invalid.';
  }
  if (values.email !== values.confirm_email) {
    errors.email = '↑ Both Email Addresses must match.';
    errors.confirm_email = '↑ Both Email Addresses must match.';
  }
  if (!values.us_states) {
    errors.us_states = '↑ States is required.';
  }
  if (!values.moc_email && !values.moc_phone && !values.moc_mail) {
    errors.mode_of_communication =
      '↑ At least one is required from the above list.';
  }
  if (!values.operating_system) {
    errors.operating_system = '↑ This is a required field.';
  }
  return errors;
};

export { mySchema,myValidation };
```

####Step 3
**Create an object to initialize values** Place it after validation method

```jsx

const mySchema = [.....
const myValidation = (values) => {.....

//place it here
const myInitialValues = {
  first_name: '',
  last_name: '',
  email: '',
  confirm_email: '',
  phone: '',
  description: '',
  operating_system: '',
  us_states: '',
  moc_email: false,
  moc_phone: false,
  moc_mail: false
};

export { mySchema, myInitialValues, myValidation };
```

####Step 4
**Call it from the component**

```jsx
import React from 'react';
import  XForm  from '@ilama007/x-form';
import { mySchema, myInitialValues, myValidation } from './mySchema';

const App = () => {
  const onSuccessHandler = (data) => {
    alert('Successful validation!');
    //'You can post following data to the API'
    console.log(data);
  };

  return (
    <div style={{ maxWidth: 700, margin: 'auto', marginTop: 100 }}>
      {
        /* Name and id of the form. Optional but recommended for style namespacing purposes when more than one form is rendered in a single page. */
        // name: string
        /* Schema of the form. Refer to the example folder to see how it is defined */
        // schema: array
        /* Initial value passed to the schema. The keys will be based upon the name of the field in the schema. Refer to the example folder. */
        // initialValues: object
        /* Function that will compose appropriate error messages for the form. */
        // validationHandler: func
        /* Function that will execute when all data are validated. This will return a valid JSON data which can be fed to API post/get request using appropriate http methods. */
        // successHandler: func
        /* Boolean flag that will enable/disable buttons. This can be used to turn on and off while data request is being processed. */
        // disableButtons: bool
        /* This sets the title of the submit button. It can be used to change text when data is being processed. */
        // okButtonTitle: PropTypes.string,
        /* This boolean flag will hide/show reset button */
        // showResetButton: PropTypes.bool
      }

      <XForm
        name='frm-survey'
        okButtonTitle='SUBMIT'
        disableButtons={false}
        showResetButton={true}
        schema={mySchema}
        initialValues={myInitialValues}
        validationHandler={myValidation}
        successHandler={onSuccessHandler}
      />
    </div>
  );
};
export default App;
```

## License

MIT © [@ilama007](https://github.com/@ilama007)
