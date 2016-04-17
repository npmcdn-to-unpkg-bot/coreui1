import Shared from '../../Shared';
import compose from 'recompose/compose';
import cx from 'classnames';
import mapProps from 'recompose/mapProps';
import withHandlers from 'recompose/withHandlers';

const TextInput = compose(
  mapProps(({ className, ...rest }) => ({
    className: cx('form-control', className),
    ...rest,
  })),
  withHandlers({
    onChange: (props) => ({ target }) =>
      props.onChange && props.onChange(target.value),
  })
)('input');

Shared.registerComponent('TextInput', TextInput);

export default TextInput;
