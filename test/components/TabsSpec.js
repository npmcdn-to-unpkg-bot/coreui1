import React from 'react';
import Tabs, { TabPane } from '../../src/components/Tabs';
import checking from 'checkers/mocha';
import { expect } from 'chai';
import sd from 'skin-deep';

const gen = checking.gen;

describe('Tabs', () => {
  it('should render a ReactElement', () => {
    const tree = sd.shallowRender(
      <Tabs activeTabKey={0}>
        <TabPane tabKey="0" text="Tab 1">Tab 1 Content</TabPane>
        <TabPane tabKey="1" text="Tab 2">Tab 2 Content</TabPane>
      </Tabs>
    );
    const vdom = tree.getRenderOutput();
    expect(vdom).to.have.property('type');
  });
});
