import devboard from 'devboard';
import React from 'react';
import Table from 'components/Table';

const definecard = devboard.ns('Table');

definecard(
  'Table',
  `
  `,
  <div className="container">
    <div className="row">
      <div className="col-xs-8 col-xl-4">
        <Table
          data={[
            { Name: 'Griffin Smith', Age: 18 },
            { Age: 23, Name: 'Lee Salminen' },
            { Age: 28, Position: 'Developer' },
          ]}
        />
      </div>
    </div>
  </div>
);
