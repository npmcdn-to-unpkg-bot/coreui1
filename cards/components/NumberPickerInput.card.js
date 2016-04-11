import devboard from 'devboard';
import React from 'react';
import NumberPickerInput from 'components/NumberPickerInput';

const definecard = devboard.ns('NumberPickerInput');

definecard(
  'NumberPickerInput',
  `
  `,
  <div className="container">
    <div className="row">
      <div className="col-xs-8 col-xl-4">
        <NumberPickerInput defaultValue={1} />
      </div>
    </div>
  </div>
);
