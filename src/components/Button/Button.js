import React, { PropTypes } from 'react';
import cx from 'classnames/dedupe';
import compose from 'recompose/compose';
import mapProps from 'recompose/mapProps';

const ButtonBase = compose(
  mapProps(({ className, ...rest }) => ({ className: cx('btn', className), ...rest }))
)('button');

const Button = (props) => <ButtonBase {...props}>{props.children}</ButtonBase>;

Button.defaultProps = { className: 'btn' };

Button.displayName = 'Button';

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
