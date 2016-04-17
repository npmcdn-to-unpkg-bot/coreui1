import React from 'react';
import CalendarInput from 'components/CalendarInput';
import checking from 'checkers/mocha';
import { expect } from 'chai';
import sd from 'skin-deep';

const gen = checking.gen;

describe('CalendarInput', () => {
  it('should render a ReactElement', () => {
    const tree = sd.shallowRender(<CalendarInput defaultValue={new Date()} />);
    const vdom = tree.getRenderOutput();
    expect(vdom).to.have.property('type');
  });
});
