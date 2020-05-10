import React from 'react';

// Use this import after npm install
// import XForm from '@ilama007/x-form';

// Use this import for local widget testinf
import XForm from 'x-form';
import 'x-form/dist/blueprint-light.css';

import { mySchema, myInitialValues, myValidation } from './mySchema';

const App = () => {
  const onSuccessHandler = (data) => {
    alert('Successful validation!');
    //'You can post following data to the API'
    console.log(data);
  };
  return (
    <div style={{ maxWidth: 700, margin: 'auto', marginTop: 100 }}>
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
