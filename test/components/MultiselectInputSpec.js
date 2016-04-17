import React from 'react';
import MultiselectInput from 'components/MultiselectInput';
import checking from 'checkers/mocha';
import { expect } from 'chai';
import sd from 'skin-deep';

const gen = checking.gen;

describe('MultiselectInput', () => {
  it('should render a ReactElement', () => {
    const tree = sd.shallowRender(
      <MultiselectInput
        data={['orange', 'red', 'blue', 'purple']}
        defaultValue={['orange', 'red']}
      />
    );
    const vdom = tree.getRenderOutput();
    expect(vdom).to.have.property('type');
  });
});
