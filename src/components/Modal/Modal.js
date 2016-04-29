import React, { PropTypes } from 'react';
import ModalDialog from './ModalDialog';
import ReactOverlaysModal from 'react-overlays/lib/Modal';
import compose from 'recompose/compose';
import cx from 'classnames';
import mapProps from 'recompose/mapProps';
import withContext from 'recompose/withContext';
import { merge } from 'ramda';

const modalStyle = {
  position: 'fixed',
  zIndex: 1040,
  top: 0, bottom: 0, left: 0, right: 0,
};

const backdropStyle = {
  ...modalStyle,
  zIndex: 'auto',
  backgroundColor: '#000',
  opacity: 0.4,
};

const modalProps = (props) => {
  const {
    backdrop, buttons, className, dialogBodyClassName, dialogBodyStyle, dialogClassName,
    dialogStyle, dialogContentClassName, dialogContentStyle, dialogHeaderClassName,
    dialogHeaderStyle, dialogTitleClassName, dialogTitleStyle, headerContent, onHide,
  } = props;

  return merge(props, {
    backdrop: !!backdrop,
    className: cx('modal fade in', className),
    dialogProps: {
      buttons,
      dialogBodyClassName,
      dialogBodyStyle,
      dialogClassName,
      dialogStyle,
      dialogContentClassName,
      dialogContentStyle,
      dialogHeaderClassName,
      dialogHeaderStyle,
      dialogTitleClassName,
      dialogTitleStyle,
      headerContent,
      onHide,
    },
    show: true,
  });
};

const ModalBase = ({ children, dialogProps, ...rest }) => (
  <ReactOverlaysModal {...rest}>
    <ModalDialog {...dialogProps}>{children}</ModalDialog>
  </ReactOverlaysModal>
);

ModalBase.propTypes = { children: PropTypes.node, dialogProps: PropTypes.object };

const BaseModal = compose(
  withContext(
    { coreuiModalContext: PropTypes.object },
    ({ onHide }) => ({ coreuiModalContext: { onHide } })
  ),
  mapProps(modalProps)
)(ModalBase);

const Modal = (props) => <BaseModal {...props}>{props.children}</BaseModal>;

Modal.defaultProps = {
  backdrop: true,
  backdropStyle,
  className: 'modal fade in',
};

Modal.displayName = 'Modal';

Modal.propTypes = {
  children: PropTypes.node,
  dialogProps: PropTypes.object,
};

export default Modal;
