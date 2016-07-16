import React from 'react';
import Table from 'coreui/components/Table';

const TableExampleSimple = () => (
  <div>
    <Table
      data={[
        { Name: 'Griffin Smith', Age: 18 },
        { Age: 23, Name: 'Lee Salminen' },
        { Age: 28, Position: 'Developer' },
      ]}
    />
  </div>
);

export default TableExampleSimple;
