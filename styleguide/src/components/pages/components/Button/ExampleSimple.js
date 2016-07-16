import React from 'react';
import Button from 'coreui/components/Button';

const ButtonExampleSimple = () => (
  <div>
    <Button>Default</Button>
    <Button actionType="primary">Primary</Button>
    <Button actionType="secondary">Secondary</Button>
    <Button actionType="link">Link</Button>
    <Button actionType="primary" disabled>Disabled</Button>
  </div>
);

export default ButtonExampleSimple;
