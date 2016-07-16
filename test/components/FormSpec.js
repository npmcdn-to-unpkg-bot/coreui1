import React from 'react';
import Form from '../../src/components/Form';
import checking from 'checkers/mocha';
import { expect } from 'chai';
import sd from 'skin-deep';

const gen = checking.gen;

describe('Form', () => {
  it('should render a ReactElement', () => {
    const tree = sd.shallowRender(<Form defaultValue={new Date()} />);
    const vdom = tree.getRenderOutput();
    expect(vdom).to.have.property('type');
  });
});
