import React from 'react';
import SelectListInput from 'coreui/components/SelectListInput';

const SelectListInputExampleSimple = () => (
  <div>
    <SelectListInput data={['orange', 'red', 'blue', 'purple']} defaultValue="orange" />
    <SelectListInput
      data={['orange', 'red', 'blue', 'purple']}
      defaultValue={['orange']}
      multiple
    />
  </div>
);

export default SelectListInputExampleSimple;
