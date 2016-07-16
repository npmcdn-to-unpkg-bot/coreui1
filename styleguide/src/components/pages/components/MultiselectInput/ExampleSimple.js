import React from 'react';
import MultiselectInput from 'coreui/components/MultiselectInput';

const MultiselectInputExampleSimple = () => (
  <div>
    <MultiselectInput
      data={['orange', 'red', 'blue', 'purple']}
      defaultValue={['orange', 'red']}
    />
  </div>
);

export default MultiselectInputExampleSimple;
