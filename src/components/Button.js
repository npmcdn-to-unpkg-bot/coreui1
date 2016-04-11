import React, { PropTypes } from 'react';
import cx from 'classnames';
import mapProps from 'recompose/mapProps';

const Button = mapProps(
  (props) => Object.assign({}, props,
    { className: cx('btn', props.className) }),
  'button'
);

Button.propTypes = {
  children: PropTypes.node,
};

export default Button;
