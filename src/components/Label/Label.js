import React, { PropTypes } from 'react';

const Label = (props) => <label {...props}>{props.children}</label>;

Label.displayName = 'Label';

Label.propTypes = { children: PropTypes.node };

export default Label;
