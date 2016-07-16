import React from 'react';
import Title from 'react-title-component';

import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import formReadmeText from './README';
import formExampleSimpleCode from '!raw!./ExampleSimple';
import FormExampleSimple from './ExampleSimple';
import formCode from '!raw!coreui/components/Form/Form';

const descriptions = {
  simple: '`Form`',
};

const FormPage = () => (
  <div>
    <Title render={(previousTitle) => `Form - ${previousTitle}`} />
    <MarkdownElement text={formReadmeText} />
    <CodeExample
      title="Simple examples"
      description={descriptions.simple}
      code={formExampleSimpleCode}
    >
      <FormExampleSimple />
    </CodeExample>
    <PropTypeDescription code={formCode} />
  </div>
);

export default FormPage;
