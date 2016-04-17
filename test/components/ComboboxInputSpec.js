import React from 'react';
import ComboboxInput from 'components/ComboboxInput';
import checking from 'checkers/mocha';
import { expect } from 'chai';
import sd from 'skin-deep';

const gen = checking.gen;

describe('ComboboxInput', () => {
  it('should render a ReactElement', () => {
    const tree = sd.shallowRender(
      <ComboboxInput data={['orange', 'red', 'blue', 'purple']} defaultValue={'orange'} />
    );
    const vdom = tree.getRenderOutput();
    expect(vdom).to.have.property('type');
  });
});
