import devboard from 'devboard';
import React from 'react';
import ComboboxInput from 'components/ComboboxInput';

const definecard = devboard.ns('ComboboxInput');

definecard(
  'ComboboxInput',
  `
  `,
  <div className="container">
    <div className="row">
      <div className="col-xs-12 col-xl-8">
        <ComboboxInput data={['orange', 'red', 'blue', 'purple']} defaultValue={'orange'} />
      </div>
    </div>
  </div>
);
