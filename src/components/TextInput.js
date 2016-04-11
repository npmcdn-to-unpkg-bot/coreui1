import React, { PropTypes } from 'react';
import cx from 'classnames';
import mapProps from 'recompose/mapProps';
import toClass from 'recompose/toClass';


import Shared from '../Shared';

const TextInput = mapProps(
  (props) => Object.assign({}, props, {
    className: cx('form-control', props.className),
    onChange: (e) => props.onChange && props.onChange(e.target.value),
  }),
  'input'
);

TextInput.propTypes = {
  className: PropTypes.string,
};

Shared.registerComponent('TextInput', toClass(TextInput));

export default TextInput;
