import React from 'react';
import DropdownListInput from 'coreui/components/DropdownListInput';

const DropdownListInputExampleSimple = () => (
  <div>
    <DropdownListInput data={['orange', 'red', 'blue', 'purple']} defaultValue={'orange'} />
  </div>
);

export default DropdownListInputExampleSimple;
