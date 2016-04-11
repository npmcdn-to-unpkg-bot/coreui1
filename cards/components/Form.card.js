import devboard from 'devboard';
import React from 'react';
import Button from 'components/Button';
import DateTimePickerInput from 'components/DateTimePickerInput';
import DropdownListInput from 'components/DropdownListInput';
import TextInput from 'components/TextInput';
import Form, { Field, Message } from 'components/Form';
import Label from 'components/Label';
import yup from 'yup';

const definecard = devboard.ns('Form');

const defaultStr = yup.string().default('');

const customerSchema = yup
  .object({
    name: yup.object({
      first: defaultStr
        .required('Please enter a first name'),

      last: defaultStr
        .required('Please enter a surname'),
    }),

    dateOfBirth: yup.date()
      .max(new Date(), 'Are you a time traveler?!'),

    colorId: yup.number()
      .nullable()
      .required('Please select a dank color'),
  });

const options = [
  { id: 0, label: 'Red' },
  { id: 1, label: 'Yellow' },
  { id: 2, label: 'Blue' },
  { id: 3, label: 'Other' },
];

const FormExample = () => (
  <Form
    defaultValue={customerSchema.default()}
    onSubmit={(v) => console.log(v)}
    schema={customerSchema}
  >
    <div className="form-group">
      <Label>First Name</Label>
      <Field
        name="name.first"
        placeholder="First name"
      />
      <Message for="name.first" />
    </div>

    <div className="form-group">
      <Label>Last Name</Label>
      <Field
        name="name.last"
        placeholder="Surname"
      />
      <Message for="name.last" />
    </div>

    <div className="form-group">
      <Label>Date of Birth</Label>
      <Field name="dateOfBirth" />
      <Message for="dateOfBirth" />
    </div>

    <div className="form-group">
      <Label>Favorite Color</Label>
      <Field
        data={options}
        defaultValue={{ label: 'Select a color...' }}
        mapValue={{ colorId: ({ id }) => id }}
        name="colorId"
        textField="label"
        type="dropdownlist"
        valueField="id"
      />
      <Message for="colorId" />
    </div>

    <Button className="btn-primary" type="submit">Submit</Button>
  </Form>
);

definecard(
  'Form',
  `
  `,
  <div className="container">
    <div className="row">
      <div className="col-xs-8 col-xl-4">
        <FormExample />
      </div>
    </div>
  </div>
);
