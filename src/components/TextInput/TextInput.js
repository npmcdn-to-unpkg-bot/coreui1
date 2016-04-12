import { PropTypes } from 'react';
import Shared from '../../Shared';
import cx from 'classnames';
import mapProps from 'recompose/mapProps';
import toClass from 'recompose/toClass';

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
