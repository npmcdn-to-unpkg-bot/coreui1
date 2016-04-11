import devboard from 'devboard';
import React from 'react';
import SelectListInput from 'components/SelectListInput';

const definecard = devboard.ns('SelectListInput');

definecard(
  'SelectListInput',
  `
  `,
  <div className="container">
    <div className="row">
      <div className="col-xs-8 col-xl-4">
        <SelectListInput data={['orange', 'red', 'blue', 'purple']} defaultValue="orange" />
        <SelectListInput
          data={['orange', 'red', 'blue', 'purple']}
          defaultValue={['orange']}
          multiple
        />
      </div>
    </div>
  </div>
);
