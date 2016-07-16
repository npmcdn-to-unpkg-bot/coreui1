import React from 'react';
import ComboboxInput from 'coreui/components/ComboboxInput';

const ComboboxInputExampleSimple = () => (
  <div>
    <ComboboxInput data={['orange', 'red', 'blue', 'purple']} defaultValue={'orange'} />
  </div>
);

export default ComboboxInputExampleSimple;
