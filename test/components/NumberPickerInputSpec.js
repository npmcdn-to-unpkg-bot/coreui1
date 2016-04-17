import React from 'react';
import NumberPickerInput from 'components/NumberPickerInput';
import checking from 'checkers/mocha';
import { expect } from 'chai';
import sd from 'skin-deep';

const gen = checking.gen;

describe('NumberPickerInput', () => {
  it('should render a ReactElement', () => {
    const tree = sd.shallowRender(<NumberPickerInput defaultValue={1} />);
    const vdom = tree.getRenderOutput();
    expect(vdom).to.have.property('type');
  });
});
