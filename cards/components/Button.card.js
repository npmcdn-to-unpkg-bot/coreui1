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
    <Button type="primary">Primary</Button>
    &nbsp;
    <Button type="secondary">Secondary</Button>
    &nbsp;
    <Button type="link">Link</Button>
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
    <Button disabled type="primary">Primary</Button>
    &nbsp;
    <Button disabled type="secondary">Secondary</Button>
  </div>
);
