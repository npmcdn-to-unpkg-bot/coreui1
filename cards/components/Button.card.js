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
    <Button className="btn-primary">Primary</Button>
    &nbsp;
    <Button className="btn-secondary">Secondary</Button>
    &nbsp;
    <Button className="btn-link">Link</Button>
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
    <Button className="btn-primary disabled">Primary</Button>
    &nbsp;
    <Button className="btn-secondary disabled">Secondary</Button>
  </div>
);
