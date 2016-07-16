import React from 'react';
import Title from 'react-title-component';

import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import multiselectInputReadmeText from './README';
import multiselectInputExampleSimpleCode from '!raw!./ExampleSimple';
import MultiselectInputExampleSimple from './ExampleSimple';
import multiselectInputCode from '!raw!coreui/components/MultiselectInput/MultiselectInput';

const descriptions = {
  simple: '`MultiselectInput`',
};

const MultiselectInputPage = () => (
  <div>
    <Title render={(previousTitle) => `MultiselectInput - ${previousTitle}`} />
    <MarkdownElement text={multiselectInputReadmeText} />
    <CodeExample
      title="Simple examples"
      description={descriptions.simple}
      code={multiselectInputExampleSimpleCode}
    >
      <MultiselectInputExampleSimple />
    </CodeExample>
    <PropTypeDescription code={multiselectInputCode} />
  </div>
);

export default MultiselectInputPage;
