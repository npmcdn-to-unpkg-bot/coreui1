import devboard from 'devboard';
import React from 'react';
import TextInput from 'components/TextInput';

const definecard = devboard.ns('TextInput');

definecard(
  'TextInput',
  `
  `,
  <div className="container">
    <div className="row">
      <div className="col-xs-12 col-xl-8">
        <TextInput placeholder="Placeholder" />
      </div>
    </div>
  </div>
);
