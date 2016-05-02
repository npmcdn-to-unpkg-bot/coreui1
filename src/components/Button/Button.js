import React, { PropTypes } from 'react';
import Shared from '../../Shared';
import defaultTheme from 'theme/components/Button';
import cx from 'classnames/dedupe';
import mapProps from 'recompose/mapProps';
import { merge } from 'ramda';

const systemStyles = {};

const ButtonContainer = mapProps(({ className, sheet, style, theme, type, ...rest }) => ({
  className: cx(
    sheet.classes.button, sheet.classes[type],
    theme.classes.button, theme.classes[type],
    className
  ),
  style: merge(theme.styles.button, theme.styles[type], style),
  ...rest,
}))('button');

const StyledButton = Shared.useSheet(ButtonContainer, systemStyles);

const Button = (props) =>
  <StyledButton {...props}>{props.children}</StyledButton>;

const classes = defaultTheme.classes;
const options = defaultTheme.options;
const styles = defaultTheme.styles;

Button.defaultProps = {
  theme: { classes, options, styles },
  type: 'default',
};

Button.displayName = 'Button';

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func,
  theme: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  type: PropTypes.string,
};

Shared.registerComponent('Button', Button);

export default Button;
