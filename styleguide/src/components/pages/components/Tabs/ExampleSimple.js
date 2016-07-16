import React from 'react';
import Tabs, { TabPane } from 'coreui/components/Tabs';

const TabsExampleSimple = () => (
  <div>
    <Tabs activeTabKey="0">
      <TabPane tabKey="0" text="Tab 1">Tab 1 Content</TabPane>
      <TabPane tabKey="1" text="Tab 2">Tab 2 Content</TabPane>
    </Tabs>
  </div>
);

export default TabsExampleSimple;
