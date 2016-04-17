import cx from 'classnames';
import compose from 'recompose/compose';
import defaultProps from 'recompose/defaultProps';
import mapProps from 'recompose/mapProps';

const Button = compose(
  defaultProps({ className: 'btn' }),
  mapProps(({ className, ...rest }) => ({ className: cx('btn', className), ...rest }))
)('button');

export default Button;
