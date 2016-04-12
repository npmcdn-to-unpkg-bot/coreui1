import React, { PropTypes } from 'react';
import Button from 'components/Button';
import Shared from '../Shared';
import ReactOverlaysModal from 'react-overlays/lib/Modal';
import compose from 'recompose/compose';
import cx from 'classnames';
import defaultProps from 'recompose/defaultProps';
import mapProps from 'recompose/mapProps';
import withContext from 'recompose/withContext';
import { intersperse, is, merge, partial, path } from 'ramda';

const handleClick = (onClick, onHide, e) => {
  if (is(Function, onClick)) { onClick(e); }
  if (is(Function, onHide)) { onHide(e); }
};

const renderButton = (events, Form, buttonData, i) => {
  const { displayText, isCancel, isDefault, isFormSubmit, name } = buttonData;
  const className = isDefault ? 'btn-primary goog-buttonset-default' : 'btn-secondary';
  const onClick = partial(handleClick, [buttonData.onClick, (isCancel && events.onHide)]);
  const text = displayText || name;

  return isFormSubmit ?
    <Form.Button {...{ className }} key={i} type="submit">{text}</Form.Button> :
    <Button {...{ className, onClick }} key={i} type="submit">{text}</Button>;
};

const maybeRenderFooter = (props) => {
  const { buttons, events, style } = props;
  const { classNames, footerStyle } = style;
  const { footer } = classNames;
  const className = cx('modal-footer', { [footer]: footer, 'text-xs-right': !footer });
  const Form = Shared.getRegisteredComponents().Form;

  return buttons && buttons.length && (
    <div {...{ className }} style={footerStyle}>
      {intersperse(' ', buttons.map(partial(renderButton, [events, Form])))}
    </div>
  );
};

const DialogContent = (props) => {
  const { children, headerContent, style } = props;
  const { bodyStyle, classNames, contentStyle, dialogStyle, headerStyle, titleStyle } = style;
  const { body, content, dialog, header, title } = classNames;

  return (
    <div className={cx('modal-dialog', dialog)} style={dialogStyle}>
      <div className={cx('modal-content', content)} style={contentStyle}>
        <div className={cx('handle modal-header', header)} style={headerStyle}>
          <button aria-label="Close" className="sr-only" type="button" />
          <h4 className={cx('handle modal-title', title)} style={titleStyle}>
            {headerContent}
          </h4>
        </div>
        <div className={cx('modal-body', body)} style={bodyStyle}>{children}</div>
        {maybeRenderFooter(props)}
      </div>
    </div>
  );
};

DialogContent.propTypes = {
  children: PropTypes.node,
  headerContent: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  style: PropTypes.object,
};

const Dialog = (props) => {
  const content = <DialogContent {...props} />;
  const Form = Shared.getRegisteredComponents().Form;

  return Form ? <Form.Context>{content}</Form.Context> : content;
};

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
    <Dialog {...dialogProps}>{children}</Dialog>
  </ReactOverlaysModal>
);

Modal.propTypes = {
  children: PropTypes.node,
  dialogProps: PropTypes.object,
};

export default compose(
  defaultProps({ events: {}, settings: {}, style: { classNames: {} } }),
  withContext(
    { coreuiModalContext: PropTypes.object },
    (props) => ({ coreuiModalContext: { onHide: props.events.onHide } })
  ),
  mapProps(modalProps)
)(Modal);
