import devboard from 'devboard';
import React from 'react';
import DropdownListInput from 'components/DropdownListInput';

const definecard = devboard.ns('DropdownListInput');

definecard(
  'DropdownListInput',
  `
  `,
  <div className="container">
    <div className="row">
      <div className="col-xs-12 col-xl-8">
        <DropdownListInput data={['orange', 'red', 'blue', 'purple']} defaultValue={'orange'} />
      </div>
    </div>
  </div>
);
