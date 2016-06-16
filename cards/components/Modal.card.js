import devboard from 'devboard';
import React, { Component } from 'react';
import Button from 'components/Button';
import 'components/DateTimePickerInput';
import 'components/DropdownListInput';
import 'components/TextInput';
import Form, { Field, Message } from 'components/Form';
import Label from 'components/Label';
import Modal from 'components/Modal';
import yup from 'yup';

const definecard = devboard.ns('Modal');

class ModalExample extends Component {
  state = { showModal: false }

  toggleShowModal = () =>
    this.setState({ showModal: !this.state.showModal })

  maybeRenderModal = () => this.state.showModal &&
    <Modal onHide={this.toggleShowModal}><div>Content</div></Modal>

  render = () => (
    <div>
      <Button className="btn-secondary" onClick={this.toggleShowModal}>
        Show Modal
      </Button>
      {this.maybeRenderModal()}
    </div>
  )
}

definecard(
  'Modal',
  `
  `,
  <div className="container">
    <div className="row">
      <div className="col-xs-12 col-xl-8">
        <ModalExample />
      </div>
    </div>
  </div>
);

const buttons = [
  { displayText: 'Cancel', isCancel: true, name: 'cancel' },
  { displayText: 'Submit', isDefault: true, isFormSubmit: true, name: 'submit' },
];

const defaultStr = yup.string().default('');

const schema = yup.object({
  name: yup.object({
    first: defaultStr.required('Please enter a first name'),
  }),
});

class ModalFormExample extends Component {
  state = { showModal: false }

  toggleShowModal = () =>
    this.setState({ showModal: !this.state.showModal })

  maybeRenderModal = () => this.state.showModal && (
    <Modal {...{ buttons }} headerContent="Modal Form Example" onHide={this.toggleShowModal}>
      <Form {...{ schema }} defaultValue={schema.default()} onSubmit={(v) => console.log(v)}>
        <div className="form-group">
          <Label>First Name</Label>
          <Field autoFocus name="name.first" placeholder="First name" />
          <Message for="name.first" />
        </div>
      </Form>
    </Modal>
  )

  render = () => (
    <div>
      <Button className="btn-secondary" onClick={this.toggleShowModal}>
        Show Modal
      </Button>
      {this.maybeRenderModal()}
    </div>
  )
}

definecard(
  'Modal Form',
  `
  `,
  <div className="container">
    <div className="row">
      <div className="col-xs-12 col-xl-8">
        <ModalFormExample />
      </div>
    </div>
  </div>
);

const handleSubmit = (v, e) => {
  console.log(e);
  e.detail.stopPropagation = true;
  console.log(v);
};

class ModalFormCancelPropagationExample extends Component {
  state = { showModal: false }

  toggleShowModal = () =>
    this.setState({ showModal: !this.state.showModal })

  maybeRenderModal = () => this.state.showModal && (
    <Modal {...{ buttons }}
      headerContent="Modal Form Stop Propagation Example"
      onHide={this.toggleShowModal}
    >
      <Form {...{ schema }} defaultValue={schema.default()} onSubmit={handleSubmit}>
        <div className="form-group">
          <Label>First Name</Label>
          <Field autoFocus name="name.first" placeholder="First name" />
          <Message for="name.first" />
        </div>
      </Form>
    </Modal>
  )

  render = () => (
    <div>
      <Button className="btn-secondary" onClick={this.toggleShowModal}>
        Show Modal
      </Button>
      {this.maybeRenderModal()}
    </div>
  )
}

definecard(
  'Modal Form Cancel Propagation',
  `
  `,
  <div className="container">
    <div className="row">
      <div className="col-xs-12 col-xl-8">
        <ModalFormCancelPropagationExample />
      </div>
    </div>
  </div>
);

const largeButtons = [
  {
    className: 'btn-lg',
    displayText: 'Submit',
    isDefault: true,
    isFormSubmit: true,
    name: 'submit',
  },
];

class ModalButtonPropsExample extends Component {
  state = { showModal: false }

  toggleShowModal = () =>
    this.setState({ showModal: !this.state.showModal })

  maybeRenderModal = () => this.state.showModal &&
    <Modal buttons={largeButtons} onHide={this.toggleShowModal}><div>Content</div></Modal>

  render = () => (
    <div>
      <Button className="btn-secondary" onClick={this.toggleShowModal}>
        Show Modal
      </Button>
      {this.maybeRenderModal()}
    </div>
  )
}

definecard(
  'Modal Button Props',
  `
  `,
  <div className="container">
    <div className="row">
      <div className="col-xs-12 col-xl-8">
        <ModalButtonPropsExample />
      </div>
    </div>
  </div>
);
