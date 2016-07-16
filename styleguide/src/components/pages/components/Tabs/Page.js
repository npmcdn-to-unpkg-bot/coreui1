import React from 'react';
import Title from 'react-title-component';

import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import tabsReadmeText from './README';
import tabsExampleSimpleCode from '!raw!./ExampleSimple';
import TabsExampleSimple from './ExampleSimple';
import tabsCode from '!raw!coreui/components/Tabs/Tabs';

const descriptions = {
  simple: '`Tabs`',
};

const TabsPage = () => (
  <div>
    <Title render={(previousTitle) => `Tabs - ${previousTitle}`} />
    <MarkdownElement text={tabsReadmeText} />
    <CodeExample
      title="Simple examples"
      description={descriptions.simple}
      code={tabsExampleSimpleCode}
    >
      <TabsExampleSimple />
    </CodeExample>
    <PropTypeDescription code={tabsCode} />
  </div>
);

export default TabsPage;
