// Type = text/textarea/password/email/tel/radiogroup/checkboxgroup/selectlist
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

export { mySchema, myInitialValues, myValidation };
