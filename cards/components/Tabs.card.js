import devboard from 'devboard';
import React, { Component } from 'react';
import Tabs, { TabPane } from 'components/Tabs';

const definecard = devboard.ns('Tabs');

class TabsExample extends Component {
  state = { activeTabKey: '0' }

  render = () => (
    <Tabs
      activeTabKey={this.state.activeTabKey}
      onSelect={(v) => this.setState({ activeTabKey: v })}
    >
      <TabPane tabKey="0" text="Tab 1">Tab 1 Content</TabPane>
      <TabPane tabKey="1" text="Tab 2">Tab 2 Content</TabPane>
    </Tabs>
  )
}

definecard(
  'Tabs',
  `
  `,
  <div className="container">
    <div className="row">
      <div className="col-xs-8 col-xl-4">
        <TabsExample />
      </div>
    </div>
  </div>
);
