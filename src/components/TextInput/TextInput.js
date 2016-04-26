import React, { PropTypes } from 'react';
import Shared from '../../Shared';
import compose from 'recompose/compose';
import cx from 'classnames/dedupe';
import mapProps from 'recompose/mapProps';
import withHandlers from 'recompose/withHandlers';

const TextInputBase = compose(
  mapProps(({ className, ...rest }) => ({
    className: cx('form-control', className),
    ...rest,
  })),
  withHandlers({
    onChange: (props) => ({ target }) =>
      props.onChange && props.onChange(target.value),
  })
)('input');

const TextInput = (props) => <TextInputBase {...props}>{props.children}</TextInputBase>;

TextInput.defaultProps = { className: 'form-control' };

TextInput.displayName = 'TextInput';

TextInput.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

Shared.registerComponent('TextInput', TextInput);

export default TextInput;
