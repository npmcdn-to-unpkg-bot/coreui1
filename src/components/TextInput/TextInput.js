import Shared from '../../Shared';
import cx from 'classnames';
import compose from 'recompose/compose';
import defaultProps from 'recompose/defaultProps';
import mapProps from 'recompose/mapProps';
import withHandlers from 'recompose/withHandlers';
import { evolve } from 'ramda';

const TextInput = compose(
  defaultProps({ className: '' }),
  mapProps((props) => evolve({ className: (s) => cx('form-control', s) }, props)),
  withHandlers({
    onChange: (props) => ({ target }) =>
      props.onChange && props.onChange(target.value),
  })
)('input');

Shared.registerComponent('TextInput', TextInput);

export default TextInput;
