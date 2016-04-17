import React from 'react';
import DateTimePickerInput from 'components/DateTimePickerInput';
import checking from 'checkers/mocha';
import { expect } from 'chai';
import sd from 'skin-deep';

const gen = checking.gen;

describe('DateTimePickerInput', () => {
  it('should render a ReactElement', () => {
    const tree = sd.shallowRender(<DateTimePickerInput defaultValue={new Date()} />);
    const vdom = tree.getRenderOutput();
    expect(vdom).to.have.property('type');
  });
});
