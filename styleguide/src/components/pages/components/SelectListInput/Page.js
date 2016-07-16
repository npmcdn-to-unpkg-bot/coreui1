import React from 'react';
import Title from 'react-title-component';

import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import selectListInputReadmeText from './README';
import selectListInputExampleSimpleCode from '!raw!./ExampleSimple';
import SelectListInputExampleSimple from './ExampleSimple';
import selectListInputCode from '!raw!coreui/components/SelectListInput/SelectListInput';

const descriptions = {
  simple: '`SelectListInput`',
};

const SelectListInputPage = () => (
  <div>
    <Title render={(previousTitle) => `SelectListInput - ${previousTitle}`} />
    <MarkdownElement text={selectListInputReadmeText} />
    <CodeExample
      title="Simple examples"
      description={descriptions.simple}
      code={selectListInputExampleSimpleCode}
    >
      <SelectListInputExampleSimple />
    </CodeExample>
    <PropTypeDescription code={selectListInputCode} />
  </div>
);

export default SelectListInputPage;
