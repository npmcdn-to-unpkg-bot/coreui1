import React, { PropTypes } from 'react';
import Shared from '../../Shared';
import defaultTheme from '../../theme/components/Button';
import cx from 'classnames/dedupe';
import mapProps from 'recompose/mapProps';
import { merge } from 'ramda';

const systemStyles = {};

const ButtonContainer = mapProps(({ actionType, className, sheet, style, theme, ...rest }) => ({
  className: cx(
    sheet.classes.button, sheet.classes[actionType],
    theme.classes.button, theme.classes[actionType],
    className
  ),
  style: merge(theme.styles.button, theme.styles[actionType], style),
  ...rest,
}))('button');

const StyledButton = Shared.useSheet(ButtonContainer, systemStyles);

const Button = (props) =>
  <StyledButton {...props}>{props.children}</StyledButton>;

const classes = defaultTheme.classes;
const options = defaultTheme.options;
const styles = defaultTheme.styles;

Button.defaultProps = {
  actionType: 'default',
  theme: { classes, options, styles },
};

Button.displayName = 'Button';

Button.propTypes = {
  actionType: PropTypes.oneOf(['default', 'link', 'primary', 'secondary']),
  children: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func,
  theme: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  type: PropTypes.oneOf(['button', 'reset', 'submit']),
};

Shared.registerComponent('Button', Button);

export default Button;
