import React from 'react';
import Button from 'components/Button';
import checking from 'checkers/mocha';
import { expect } from 'chai';
import sd from 'skin-deep';

const gen = checking.gen;

describe('Button', () => {
  it('should render a ReactElement', () => {
    const tree = sd.shallowRender(<Button>Title</Button>);
    const vdom = tree.getRenderOutput();
    expect(vdom).to.have.property('type');
    expect(vdom.props).to.have.property('children', 'Title');
  });
});

describe('ButtonProperties', () => {
  checking('.charAlphanum', [gen.charAlphanum], (s) => {
    const tree = sd.shallowRender(<Button>{s}</Button>);
    const vdom = tree.getRenderOutput();

    return vdom.props.children === s;
  }, 100);
});
