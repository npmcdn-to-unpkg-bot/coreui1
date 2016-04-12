import cx from 'classnames';
import compose from 'recompose/compose';
import defaultProps from 'recompose/defaultProps';
import mapProps from 'recompose/mapProps';
import { evolve } from 'ramda';

const Button = compose(
  defaultProps({ className: 'btn' }),
  mapProps((props) => evolve({ className: (s) => cx('btn', s) }, props))
)('button');

export default Button;
