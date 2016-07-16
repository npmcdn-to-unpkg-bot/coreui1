import React, { Component } from 'react';
import Button from 'coreui/components/Button';
import Modal from 'coreui/components/Modal';

class ModalExampleSimple extends Component {
  state = { showModal: false }

  maybeRenderModal = () => this.state.showModal &&
  <Modal onHide={this.toggleShowModal}><div>Content</div></Modal>

  toggleShowModal = () =>
    this.setState({ showModal: !this.state.showModal })

  render() {
    return (
      <div>
        <Button className="btn-secondary" onClick={this.toggleShowModal}>
          Show Modal
        </Button>
        {this.maybeRenderModal()}
      </div>
    );
  }
}

export default ModalExampleSimple;
