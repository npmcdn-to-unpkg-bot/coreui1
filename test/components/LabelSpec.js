import React from 'react';
import Label from '../../src/components/Label';
import checking from 'checkers/mocha';
import { expect } from 'chai';
import sd from 'skin-deep';

const gen = checking.gen;

describe('Label', () => {
  it('should render a ReactElement', () => {
    const tree = sd.shallowRender(<Label>Title</Label>);
    const vdom = tree.getRenderOutput();
    expect(vdom.props).to.have.property('children', 'Title');
  });
});

describe('LabelProperties', () => {
  checking('.charAlphanum', [gen.charAlphanum], (s) => {
    const tree = sd.shallowRender(<Label>{s}</Label>);
    const vdom = tree.getRenderOutput();

    return vdom.props.children === s;
  }, 100);
});
