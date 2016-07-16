import React from 'react';
import Title from 'react-title-component';

import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import comboboxInputReadmeText from './README';
import comboboxInputExampleSimpleCode from '!raw!./ExampleSimple';
import ComboboxInputExampleSimple from './ExampleSimple';
import comboboxInputCode from '!raw!coreui/components/ComboboxInput/ComboboxInput';

const descriptions = {
  simple: '`ComboboxInput`',
};

const ComboboxInputPage = () => (
  <div>
    <Title render={(previousTitle) => `ComboboxInput - ${previousTitle}`} />
    <MarkdownElement text={comboboxInputReadmeText} />
    <CodeExample
      title="Simple examples"
      description={descriptions.simple}
      code={comboboxInputExampleSimpleCode}
    >
      <ComboboxInputExampleSimple />
    </CodeExample>
    <PropTypeDescription code={comboboxInputCode} />
  </div>
);

export default ComboboxInputPage;
