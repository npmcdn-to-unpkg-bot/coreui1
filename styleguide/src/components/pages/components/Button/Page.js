import React from 'react';
import Title from 'react-title-component';

import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import buttonReadmeText from './README';
import buttonExampleSimpleCode from '!raw!./ExampleSimple';
import ButtonExampleSimple from './ExampleSimple';
import buttonCode from '!raw!coreui/components/Button/Button';

const descriptions = {
  simple: '`Button` with default color, `primary`, `secondary`, `link` and `disabled` props applied.',
};

const ButtonPage = () => (
  <div>
    <Title render={(previousTitle) => `Button - ${previousTitle}`} />
    <MarkdownElement text={buttonReadmeText} />
    <CodeExample
      title="Simple examples"
      description={descriptions.simple}
      code={buttonExampleSimpleCode}
    >
      <ButtonExampleSimple />
    </CodeExample>
    <PropTypeDescription code={buttonCode} />
  </div>
);

export default ButtonPage;
