import React from 'react';
import Title from 'react-title-component';

import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import modalReadmeText from './README';
import modalExampleSimpleCode from '!raw!./ExampleSimple';
import ModalExampleSimple from './ExampleSimple';
import modalCode from '!raw!coreui/components/Modal/Modal';

const descriptions = {
  simple: '`Modal`',
};

const ModalPage = () => (
  <div>
    <Title render={(previousTitle) => `Modal - ${previousTitle}`} />
    <MarkdownElement text={modalReadmeText} />
    <CodeExample
      title="Simple examples"
      description={descriptions.simple}
      code={modalExampleSimpleCode}
    >
      <ModalExampleSimple />
    </CodeExample>
    <PropTypeDescription code={modalCode} />
  </div>
);

export default ModalPage;
