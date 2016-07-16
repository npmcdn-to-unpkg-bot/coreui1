import React, { PropTypes } from 'react';
import Shared from '../../Shared';
import defaultTheme from '../../theme/components/TextInput';
import compose from 'recompose/compose';
import cx from 'classnames/dedupe';
import mapProps from 'recompose/mapProps';
import withHandlers from 'recompose/withHandlers';
import { merge } from 'ramda';

const systemStyles = { };

const TextInputContainer = compose(
  withHandlers({
    onChange: (props) => ({ target }) =>
      props.onChange && props.onChange(target.value),
  }),
  mapProps(({ className, sheet, style, theme, ...rest }) => ({
    className: cx(sheet.classes.textInput, theme.classes.textInput, className),
    style: merge(theme.styles.textInput, style),
    ...rest,
  }))
)('input');

const StyledTextInput = Shared.useSheet(TextInputContainer, systemStyles);

const TextInput = (props) =>
  <StyledTextInput {...props}>{props.children}</StyledTextInput>;

const classes = defaultTheme.classes;
const options = defaultTheme.options;
const styles = defaultTheme.styles;

TextInput.defaultProps = { theme: { classes, options, styles } };

TextInput.displayName = 'TextInput';

TextInput.propTypes = {
  children: PropTypes.node,

  className: PropTypes.string,

  theme: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
};

Shared.registerComponent('TextInput', TextInput);

export default TextInput;
