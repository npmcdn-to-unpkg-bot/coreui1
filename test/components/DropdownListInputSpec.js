import React from 'react/addons';
import DropdownListInput from 'components/DropdownListInput';
import checking from 'checkers/mocha';
import { expect } from 'chai';
import sd from 'skin-deep';

const gen = checking.gen;

describe('DropdownListInput', () => {
  it('should render a ReactElement', () => {
    const tree = sd.shallowRender(
      <DropdownListInput data={['orange', 'red', 'blue', 'purple']} defaultValue={'orange'} />
    );
    const vdom = tree.getRenderOutput();
    expect(vdom).to.have.property('type');
  });
});
