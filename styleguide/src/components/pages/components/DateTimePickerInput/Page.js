import React from 'react';
import Title from 'react-title-component';

import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import dateTimePickerInputReadmeText from './README';
import dateTimePickerInputExampleSimpleCode from '!raw!./ExampleSimple';
import DateTimePickerInputExampleSimple from './ExampleSimple';
import dateTimePickerInputCode from '!raw!coreui/components/DateTimePickerInput/DateTimePickerInput';

const descriptions = {
  simple: '`DateTimePickerInput`',
};

const DateTimePickerInputPage = () => (
  <div>
    <Title render={(previousTitle) => `DateTimePickerInput - ${previousTitle}`} />
    <MarkdownElement text={dateTimePickerInputReadmeText} />
    <CodeExample
      title="Simple examples"
      description={descriptions.simple}
      code={dateTimePickerInputExampleSimpleCode}
    >
      <DateTimePickerInputExampleSimple />
    </CodeExample>
    <PropTypeDescription code={dateTimePickerInputCode} />
  </div>
);

export default DateTimePickerInputPage;
