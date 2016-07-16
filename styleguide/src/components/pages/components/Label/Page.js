import React from 'react';
import Title from 'react-title-component';

import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import labelReadmeText from './README';
import labelExampleSimpleCode from '!raw!./ExampleSimple';
import LabelExampleSimple from './ExampleSimple';
import labelCode from '!raw!coreui/components/Label/Label';

const descriptions = {
  simple: '`Label`',
};

const LabelPage = () => (
  <div>
    <Title render={(previousTitle) => `Label - ${previousTitle}`} />
    <MarkdownElement text={labelReadmeText} />
    <CodeExample
      title="Simple examples"
      description={descriptions.simple}
      code={labelExampleSimpleCode}
    >
      <LabelExampleSimple />
    </CodeExample>
    <PropTypeDescription code={labelCode} />
  </div>
);

export default LabelPage;
