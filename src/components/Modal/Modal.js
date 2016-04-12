import React, { PropTypes } from 'react';
import ModalDialog from './ModalDialog';
import ReactOverlaysModal from 'react-overlays/lib/Modal';
import compose from 'recompose/compose';
import cx from 'classnames';
import defaultProps from 'recompose/defaultProps';
import mapProps from 'recompose/mapProps';
import withContext from 'recompose/withContext';
import { merge, path } from 'ramda';

const defaultModalStyle = {
  position: 'fixed',
  zIndex: 1040,
  top: 0, bottom: 0, left: 0, right: 0,
};

const defaultBackdropStyle = {
  ...defaultModalStyle,
  zIndex: 'auto',
  backgroundColor: '#000',
  opacity: 0.4,
};

const modalProps = (props) => {
  const { buttons, children, className, container, events, headerContent, settings, style } = props;
  const { autoFocus, backdrop, enforceFocus, keyboard, transition } = settings;
  const { backdropStyle, classNames } = style || {};

  return merge(events, {
    autoFocus,
    backdrop: !(backdrop === false),
    backdropClassName: classNames.backdrop,
    backdropStyle: backdropStyle || defaultBackdropStyle,
    backdropTransitionTimeout: path(['backdrop', 'transitionTimeout'], settings),
    children,
    className: cx('modal fade in', className),
    container,
    containerClassName: cx('modal-open', classNames.container),
    dialogTransitionTimeout: path(['dialog', 'transitionTimeout'], settings),
    dialogProps: { buttons, events, headerContent, style },
    enforceFocus,
    keyboard,
    show: true,
    transition,
  });
};

const Modal = ({ children, dialogProps, ...rest }) => (
  <ReactOverlaysModal {...rest}>
    <ModalDialog {...dialogProps}>{children}</ModalDialog>
  </ReactOverlaysModal>
);

Modal.propTypes = { children: PropTypes.node, dialogProps: PropTypes.object };

export default compose(
  defaultProps({ events: {}, settings: {}, style: { classNames: {} } }),
  withContext(
    { coreuiModalContext: PropTypes.object },
    (props) => ({ coreuiModalContext: { onHide: props.events.onHide } })
  ),
  mapProps(modalProps)
)(Modal);
