import React from 'react';
import Title from 'react-title-component';

import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import dropdownListInputReadmeText from './README';
import dropdownListInputExampleSimpleCode from '!raw!./ExampleSimple';
import DropdownListInputExampleSimple from './ExampleSimple';
import dropdownListInputCode from '!raw!coreui/components/DropdownListInput/DropdownListInput';

const descriptions = {
  simple: '`DropdownListInput`',
};

const DropdownListInputPage = () => (
  <div>
    <Title render={(previousTitle) => `DropdownListInput - ${previousTitle}`} />
    <MarkdownElement text={dropdownListInputReadmeText} />
    <CodeExample
      title="Simple examples"
      description={descriptions.simple}
      code={dropdownListInputExampleSimpleCode}
    >
      <DropdownListInputExampleSimple />
    </CodeExample>
    <PropTypeDescription code={dropdownListInputCode} />
  </div>
);

export default DropdownListInputPage;
