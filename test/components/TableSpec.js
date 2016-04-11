import React from 'react/addons';
import Table from 'components/Table';
import checking from 'checkers/mocha';
import { expect } from 'chai';
import sd from 'skin-deep';

const gen = checking.gen;

describe('Table', () => {
  it('should render a ReactElement', () => {
    const tree = sd.shallowRender(
      <Table
        data={[
          { Name: 'Griffin Smith', Age: 18 },
          { Age: 23, Name: 'Lee Salminen' },
          { Age: 28, Position: 'Developer' },
        ]}
      />
    );
    const vdom = tree.getRenderOutput();
    expect(vdom).to.have.property('type');
  });
});
