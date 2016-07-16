import React from 'react';
import yup from 'yup';
import Form, { Button, Field } from 'coreui/components/Form';
import Label from 'coreui/components/Label';

const defaultRequiredStr = yup.string().default('').required('This field is required');
const schema = yup.object({
  password: defaultRequiredStr,
  rememberme: yup.bool().default(false),
  username: defaultRequiredStr,
});

const FormExampleSimple = () => (

<Form {...{ schema }} defaultValue={schema.default()} onSubmit={(v) => console.log(v) }>
  <div className="form-group">
    <div className="row">
      <div className="col-sm-3 text-sm-right">
        <Label className="control-label required" htmlFor="username">Username</Label>
      </div>
      <div className="col-sm-6">
        <Field
          id="username"
          name="username"
          placeholder="What is your username?"
        />
      </div>
    </div>
  </div>
  <div className="form-group">
    <div className="row">
      <div className="col-sm-3 text-sm-right">
        <Label className="control-label required" htmlFor="password">Password</Label>
      </div>
      <div className="col-sm-6">
        <Field
          id="password"
          name="password"
          placeholder="What is the secret phrase?"
          type="password"
        />
      </div>
    </div>
  </div>
  <div className="form-group">
    <div className="row">
      <div className="col-sm-6 col-sm-offset-3">
        <Field
          id="rememberme"
          name="rememberme"
          type="checkbox"
        />
        &nbsp;
        <Label for="rememberme">Remember me</Label>
      </div>
    </div>
  </div>
  <div className="form-group">
    <div className="row">
      <div className="col-sm-6 col-sm-offset-3">
        <Button className="btn-primary" type="submit">Sign in</Button>
        <Button className="btn-secondary" type="button">Cancel</Button>
      </div>
    </div>
  </div>
</Form>
);

export default FormExampleSimple;
