import devboard from 'devboard';
import React from 'react';
import Button from 'components/Button';

const definecard = devboard.ns('Button');

definecard('Button Colors',
  `
  `,
  <div>
    <Button>Default</Button>
    &nbsp;
    <Button actionType="primary">Primary</Button>
    &nbsp;
    <Button actionType="secondary">Secondary</Button>
    &nbsp;
    <Button actionType="link">Link</Button>
  </div>
);

definecard('Button States',
  `
  Disabled styles are available \`button\` and \`input\` tags by applying the disabled attribute.
  Anchor tags can appear disabled by adding the .disabled class,
   though this does not actually disable the link.
  `
  ,
  <div>
    <Button disabled actionType="primary">Primary</Button>
    &nbsp;
    <Button disabled actionType="secondary">Secondary</Button>
  </div>
);
