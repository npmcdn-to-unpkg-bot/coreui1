import devboard from 'devboard';
import React from 'react';
import Label from 'components/Label';

const definecard = devboard.ns('Label');

definecard(
  'Labels',
  `
  `,
  <div className="container">
    <div className="row">
      <div className="col-xs-8 col-xl-4">
        <Label>Title</Label>
      </div>
    </div>
  </div>
);
