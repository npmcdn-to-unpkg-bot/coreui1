import React, { PropTypes } from 'react';
import Button from 'components/Button';
import Shared from '../Shared';
import ROModal from 'react-overlays/lib/Modal';
import cx from 'classnames';
import withContext from 'recompose/withContext';
import withProps from 'recompose/withProps';
import { and, is, isArrayLike, isEmpty, partial, when } from 'ramda';

const Form = Shared.getRegisteredComponents().Form;

const handleClick = (onClick, onHide, e) => {
  if (is(Function, onClick)) { onClick(e); }
  if (is(Function, onHide)) { onHide(e); }
};

const maybeRenderButtons = (props) => {
  const { buttons, onHide } = props;

  return when(
    () => and(isArrayLike(buttons), !isEmpty(buttons)),
    () => buttons.map((b, i) => {
      const { displayText, isCancel, isDefault, isFormSubmit, name, onClick } = b;
      const text = displayText || name;
      const className = cx({
        'btn-primary goog-buttonset-default': isDefault,
        'btn-secondary': !isDefault,
      });

      return isFormSubmit ?
        <Button {...{ className }} key={i} type="submit">{text}</Button> : (
          <Button {...{ className }}
            key={i}
            onClick={partial(handleClick, [
              onClick,
              when(() => isCancel, () => onHide)(null),
            ])}
            type="submit"
          >
            {text}
          </Button>
        );
    })
  )(null);
};

const dialogStyle = {
  border: 'none',
  backgroundColor: '#fff',
  boxShadow: '0 5px 15px rgba(0,0,0,.5)',
  minHeight: 400,
  maxWidth: 800,
  width: 800,
  zIndex: 1041,
};

const contentStyle = { padding: 20, overflow: 'auto' };

const Dialog = (props) => {
  const { children, header } = props;

  return (
    <div className={cx('modal-dialog')} style={dialogStyle}>
      <div className="modal-content">
        <div className="handle modal-header">
          <button ariaLabel="Close" className="sr-only" type="button" />
          <h4 className="handle modal-title">{header}</h4>
        </div>
        <div className="modal-body" style={contentStyle}>{children}</div>
        <div className="modal-footer text-xs-right">
          {maybeRenderButtons(props)}
        </div>
      </div>
    </div>
  );
};

Dialog.propTypes = {
  buttons: PropTypes.array,
  children: PropTypes.node,
  header: PropTypes.string,
};

const DialogWithContext = withContext(
  { coreuiModalContext: PropTypes.object },
  (props) => ({ coreuiModalContext: { onHide: props.onHide } }),
  Dialog
);

const renderDialog = (props) => {
  const dialogElement = <DialogWithContext {...props} />;

  return Form ?
    <Form.Context>{dialogElement}</Form.Context> :
    dialogElement;
};

const backdropStyle = {
  position: 'fixed',
  zIndex: 'auto',
  top: 0, bottom: 0, left: 0, right: 0,
  backgroundColor: 'rgba(214, 219, 228, 0.8)',
  opacity: 0.8,
};

const ModalComponent = withProps(
  {
    backdropStyle,
    className: 'modal fade in',
    show: true,
    style: {
      alignItems: 'center',
      backgroundColor: 'inherit',
      bottom: 0,
      display: 'flex',
      justifyContent: 'center',
      left: 0,
      overflowX: 'inherit',
      overflowY: 'inherit',
      position: 'fixed',
      right: 0,
      top: 0,
      zIndex: 1000,
    },
  },
  ROModal
);

const Modal = (props) =>
  <ModalComponent {...props}>{renderDialog(props)}</ModalComponent>;

Modal.propTypes = {
  children: PropTypes.node,
  onHide: PropTypes.func,
};

export default Modal;
