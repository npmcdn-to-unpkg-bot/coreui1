import devboard from 'devboard';
import React from 'react';
import DateTimePickerInput from 'components/DateTimePickerInput';

const definecard = devboard.ns('DateTimePickerInput');

definecard(
  'DateTimePickerInput',
  `
  `,
  <div className="container">
    <div className="row">
      <div className="col-xs-8 col-xl-4">
        <DateTimePickerInput defaultValue={new Date()} />
      </div>
    </div>
  </div>
);
