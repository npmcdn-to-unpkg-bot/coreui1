import React from 'react';
import Title from 'react-title-component';

import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import numberPickerInputReadmeText from './README';
import numberPickerInputExampleSimpleCode from '!raw!./ExampleSimple';
import NumberPickerInputExampleSimple from './ExampleSimple';
import numberPickerInputCode from '!raw!coreui/components/NumberPickerInput/NumberPickerInput';

const descriptions = {
  simple: '`NumberPickerInput`',
};

const NumberPickerInputPage = () => (
  <div>
    <Title render={(previousTitle) => `NumberPickerInput - ${previousTitle}`} />
    <MarkdownElement text={numberPickerInputReadmeText} />
    <CodeExample
      title="Simple examples"
      description={descriptions.simple}
      code={numberPickerInputExampleSimpleCode}
    >
      <NumberPickerInputExampleSimple />
    </CodeExample>
    <PropTypeDescription code={numberPickerInputCode} />
  </div>
);

export default NumberPickerInputPage;
