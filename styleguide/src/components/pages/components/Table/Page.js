import React from 'react';
import Title from 'react-title-component';

import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import tableReadmeText from './README';
import tableExampleSimpleCode from '!raw!./ExampleSimple';
import TableExampleSimple from './ExampleSimple';
import tableCode from '!raw!coreui/components/Table/Table';

const descriptions = {
  simple: '`Table`',
};

const TablePage = () => (
  <div>
    <Title render={(previousTitle) => `Table - ${previousTitle}`} />
    <MarkdownElement text={tableReadmeText} />
    <CodeExample
      title="Simple examples"
      description={descriptions.simple}
      code={tableExampleSimpleCode}
    >
      <TableExampleSimple />
    </CodeExample>
    <PropTypeDescription code={tableCode} />
  </div>
);

export default TablePage;
