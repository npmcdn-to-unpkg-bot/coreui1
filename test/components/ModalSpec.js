import React from 'react/addons';
import Modal from 'components/Modal';
import checking from 'checkers/mocha';
import { expect } from 'chai';
import sd from 'skin-deep';

const gen = checking.gen;

describe('Modal', () => {
  it('should render a ReactElement', () => {
    const tree = sd.shallowRender(
      <Modal show><div>Content</div></Modal>
    );
    const vdom = tree.getRenderOutput();
    expect(vdom).to.have.property('type');
    expect(vdom.props.children).to.have.property('type');
    expect(tree.subTree('div').text()).to.equal('Content');
  });
});
