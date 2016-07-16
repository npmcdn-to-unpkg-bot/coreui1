import React from 'react';
import Title from 'react-title-component';

import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import calendarInputReadmeText from './README';
import calendarInputExampleSimpleCode from '!raw!./ExampleSimple';
import CalendarInputExampleSimple from './ExampleSimple';
import calendarInputCode from '!raw!coreui/components/CalendarInput/CalendarInput';

const descriptions = {
  simple: '`CalendarInput`',
};

const CalendarInputPage = () => (
  <div>
    <Title render={(previousTitle) => `CalendarInput - ${previousTitle}`} />
    <MarkdownElement text={calendarInputReadmeText} />
    <CodeExample
      title="Simple examples"
      description={descriptions.simple}
      code={calendarInputExampleSimpleCode}
    >
      <CalendarInputExampleSimple />
    </CodeExample>
    <PropTypeDescription code={calendarInputCode} />
  </div>
);

export default CalendarInputPage;
