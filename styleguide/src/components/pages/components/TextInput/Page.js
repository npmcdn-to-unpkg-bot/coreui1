import React from 'react';
import Title from 'react-title-component';

import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import textInputReadmeText from './README';
import textInputExampleSimpleCode from '!raw!./ExampleSimple';
import TextInputExampleSimple from './ExampleSimple';
import textInputCode from '!raw!coreui/components/TextInput/TextInput';

const descriptions = {
  simple: '`TextInput`',
};

const TextInputPage = () => (
  <div>
    <Title render={(previousTitle) => `TextInput - ${previousTitle}`} />
    <MarkdownElement text={textInputReadmeText} />
    <CodeExample
      title="Simple examples"
      description={descriptions.simple}
      code={textInputExampleSimpleCode}
    >
      <TextInputExampleSimple />
    </CodeExample>
    <PropTypeDescription code={textInputCode} />
  </div>
);

export default TextInputPage;
