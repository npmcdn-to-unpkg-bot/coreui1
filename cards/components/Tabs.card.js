import devboard from 'devboard';
import React from 'react';
import Tabs, { TabPane } from 'components/Tabs';

const definecard = devboard.ns('Tabs');

definecard(
  'Tabs',
  `
  `,
  <div className="container">
    <div className="row">
      <div className="col-xs-12 col-xl-8">
        <Tabs activeTabKey="0">
          <TabPane tabKey="0" text="Tab 1">Tab 1 Content</TabPane>
          <TabPane tabKey="1" text="Tab 2">Tab 2 Content</TabPane>
        </Tabs>
      </div>
    </div>
  </div>
);

definecard(
  'Tabs bar',
  `
  `,
  <div className="container">
    <div className="row">
      <div className="col-xs-12 col-xl-8">
        <Tabs activeTabKey="0" className="tab-bar">
          <TabPane tabKey="0" text="Tab 1">Tab 1 Content</TabPane>
          <TabPane tabKey="1" text="Tab 2">Tab 2 Content</TabPane>
        </Tabs>
      </div>
    </div>
  </div>
);

definecard(
  'Tabs external content',
  `
  `,
  <div className="container">
    <div className="row">
      <div className="col-xs-12 col-xl-8">
        <Tabs
          activeTabKey="0"
          className="tab-bar"
          externalContent={true}
          onChange={(activeTabKey) => { console.log({ activeTabKey }); }}
        >
          <TabPane tabKey="0" text="Tab 1" />
          <TabPane tabKey="1" text="Tab 2" />
        </Tabs>
      </div>
    </div>
  </div>
);
