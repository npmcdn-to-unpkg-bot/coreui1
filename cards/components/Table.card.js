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
      <div className="col-xs-12 col-xl-8">
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

definecard(
  'Table Specified Columns',
  `
  `,
  <div className="container">
    <div className="row">
      <div className="col-xs-12 col-xl-8">
        <Table
          columns={['Age', 'Name']}
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

definecard(
  'Table Column Display Names',
  `
  `,
  <div className="container">
    <div className="row">
      <div className="col-xs-12 col-xl-8">
        <Table
          columns={[
            { displayName: 'Age', id: 'Age' },
            { displayName: 'Name', id: 'Name' },
            { displayName: 'Position', id: 'Position' },
          ]}
          data={[
            { Name: 'Griffin Smith', Age: 18 },
            { Age: 23, Name: 'Lee Salminen' },
            { Age: 28, Position: 'Developer' },
          ]}
          onClick={(v) => console.log(v)}
        />
      </div>
    </div>
  </div>
);

definecard(
  'Table Row Selection',
  `
  `,
  <div className="container">
    <div className="row">
      <div className="col-xs-12 col-xl-8">
        <Table
          className="table-hover"
          columns={['Age', 'Name', 'Position']}
          data={[
            { id: 0, Name: 'Griffin Smith', Age: 18 },
            { id: 1, Age: 23, Name: 'Lee Salminen' },
            { id: 2, Age: 28, Position: 'Developer' },
          ]}
          onClick={(rowId, selectedRows) => console.log(rowId, selectedRows)}
          selection
          valueField="id"
        />
      </div>
    </div>
  </div>
);

definecard(
  'Table Row Single Selection',
  `
  `,
  <div className="container">
    <div className="row">
      <div className="col-xs-12 col-xl-8">
        <Table
          className="table-hover"
          columns={['Age', 'Name', 'Position']}
          data={[
            { id: 0, Name: 'Griffin Smith', Age: 18 },
            { id: 1, Age: 23, Name: 'Lee Salminen' },
            { id: 2, Age: 28, Position: 'Developer' },
          ]}
          onClick={(v) => console.log(v)}
          selectMultiple={false}
          valueField="id"
        />
      </div>
    </div>
  </div>
);

definecard(
  'Table Invalid Key Column',
  `
  `,
  <div className="container">
    <div className="row">
      <div className="col-xs-12 col-xl-8">
        <Table
          className="table-hover"
          columns={['Age', 'Name', 'Position']}
          data={[
            { id: 0, Name: 'Griffin Smith', Age: 18 },
            { id: 1, Age: 23, Name: 'Lee Salminen' },
            { id: null, Age: 28, Position: 'Developer' },
          ]}
          onClick={(v) => console.log(v)}
          selectMultiple={false}
          valueField="id"
        />
      </div>
    </div>
  </div>
);

definecard(
  'Table Search',
  `
  `,
  <div className="container">
    <div className="row">
      <div className="col-xs-12 col-xl-8">
        <Table
          data={[
            { Name: 'Griffin Smith', Age: 18 },
            { Age: 23, Name: 'Lee Salminen' },
            { Age: 28, Position: 'Developer' },
          ]}
          searchable
        />
      </div>
    </div>
  </div>
);

definecard(
  'Table Pagination',
  `
  `,
  <div className="container">
    <div className="row">
      <div className="col-xs-12 col-xl-8">
        <Table
          data={[
            { Name: 'Griffin Smith', Age: 18 },
            { Age: 23, Name: 'Lee Salminen' },
            { Age: 28, Position: 'Developer' },
          ]}
          pageSize={2}
          pagination
        />
      </div>
    </div>
  </div>
);

definecard(
  'Table Search and Pagination',
  `
  `,
  <div className="container">
    <div className="row">
      <div className="col-xs-12 col-xl-8">
        <Table
          data={[
            { Name: 'Griffin Smith', Age: 18 },
            { Age: 23, Name: 'Lee Salminen' },
            { Age: 28, Position: 'Developer' },
          ]}
          pageSize={2}
          pagination searchable
        />
      </div>
    </div>
  </div>
);

const Bold = ({ data }) => <strong>{data}</strong>;

definecard(
  'Table custom components',
  `
  `,
  <div className="container">
    <div className="row">
      <div className="col-xs-12 col-xl-8">
        <Table
          columns={[
            { component: Bold, displayName: 'Age', id: 'Age' },
            { displayName: 'Name', id: 'Name' },
            { displayName: 'Position', id: 'Position' },
          ]}
          data={[
            { Name: 'Griffin Smith', Age: 18 },
            { Age: 23, Name: 'Lee Salminen' },
            { Age: 28, Position: 'Developer' },
          ]}
          onClick={(v) => console.log(v)}
        />
      </div>
    </div>
  </div>
);

definecard(
  'Table Inline Style',
  `
  `,
  <div className="container">
    <div className="row">
      <div className="col-xs-12 col-xl-8">
        <Table
          data={[
            { Name: 'Griffin Smith', Age: 18 },
            { Age: 23, Name: 'Lee Salminen' },
            { Age: 28, Position: 'Developer' },
          ]}
          style={{ border: '1px solid red' }}
        />
      </div>
    </div>
  </div>
);

definecard(
  'Table Initial Sort',
  `
  `,
  <div className="container">
    <div className="row">
      <div className="col-xs-12 col-xl-8">
        <Table
          data={[
            { Name: 'Griffin Smith', Age: 23 },
            { Age: 18, Name: 'Lee Salminen' },
            { Age: 28, Position: 'Developer' },
          ]}
          sortAscending={false}
          sortField="Age"
        />
      </div>
    </div>
  </div>
);
