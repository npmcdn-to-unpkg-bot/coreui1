import devboard from 'devboard';
import React from 'react';
import MultiselectInput from 'components/MultiselectInput';

const definecard = devboard.ns('MultiselectInput');

definecard(
  'MultiselectInput',
  `
  `,
  <div className="container">
    <div className="row">
      <div className="col-xs-8 col-xl-4">
        <MultiselectInput
          data={['orange', 'red', 'blue', 'purple']}
          defaultValue={['orange', 'red']}
        />
      </div>
    </div>
  </div>
);
