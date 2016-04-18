import devboard from 'devboard';
import React from 'react';
import CalendarInput from 'components/CalendarInput';

const definecard = devboard.ns('CalendarInput');

definecard(
  'CalendarInput',
  `
  `,
  <div className="container">
    <div className="row">
      <div className="col-xs-12 col-md-8 col-xl-4">
        <CalendarInput defaultValue={new Date()} />
      </div>
    </div>
  </div>
);
