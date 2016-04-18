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
      <div className="col-xs-12 col-xl-8">
        <DateTimePickerInput defaultValue={new Date()} />
      </div>
    </div>
  </div>
);
