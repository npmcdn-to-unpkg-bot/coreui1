import React, { PropTypes } from 'react';
import cx from 'classnames';
import mapProps from 'recompose/mapProps';
import { merge } from 'ramda';

const Button = mapProps(
  (props) =>
    merge(
      props,
      { className: cx('btn', props.className) }
    ),
  'button'
);

Button.propTypes = {
  children: PropTypes.node,
};

export default Button;
