import React, { PropTypes } from 'react';
import Button from 'components/Button';
import Shared from '../../Shared';
import cx from 'classnames';
import { intersperse, is, partial } from 'ramda';

const handleClick = (onClick, onHide, e) => {
  if (is(Function, onClick)) { onClick(e); }
  if (is(Function, onHide)) { onHide(e); }
};

const renderButton = ({ onHide }, Form, buttonData, i) => {
  const { displayText, isCancel, isDefault, isFormSubmit, name } = buttonData;
  const className = isDefault ? 'btn-primary goog-buttonset-default' : 'btn-secondary';
  const onClick = partial(handleClick, [buttonData.onClick, (isCancel && onHide)]);
  const text = displayText || name;

  return isFormSubmit ?
    <Form.Button {...{ className }} key={i} type="submit">{text}</Form.Button> :
    <Button {...{ className, onClick }} key={i} type="submit">{text}</Button>;
};

const maybeRenderFooter = (props) => {
  const { buttons, dialogFooterClassName, dialogFooterStyle } = props;
  const className = cx('modal-footer', {
    [dialogFooterClassName]: dialogFooterClassName, 'text-xs-right': !dialogFooterClassName,
  });
  const Form = Shared.getRegisteredComponents().Form;

  return buttons && buttons.length && (
      <div {...{ className }} style={dialogFooterStyle}>
        {intersperse(' ', buttons.map(partial(renderButton, [props, Form])))}
      </div>
    );
};

const ModalDialog = (props) => {
  const {
    children, dialogBodyClassName, dialogBodyStyle, dialogClassName, dialogContentClassName,
    dialogContentStyle, dialogHeaderClassName, dialogHeaderStyle, dialogStyle,
    dialogTitleClassName, dialogTitleStyle, headerContent,
  } = props;
  const Form = Shared.getRegisteredComponents().Form;
  const Container = Form ? Form.Context : 'div';

  return (
    <Container>
      <div className={cx('modal-dialog', dialogClassName)} style={dialogStyle}>
        <div className={cx('modal-content', dialogContentClassName)} style={dialogContentStyle}>
          <div
            className={cx('handle modal-header', dialogHeaderClassName)}
            style={dialogHeaderStyle}
          >
            <button aria-label="Close" className="sr-only" type="button" />
            <h4 className={cx('handle modal-title', dialogTitleClassName)} style={dialogTitleStyle}>
              {headerContent}
            </h4>
          </div>
          <div
            className={cx('modal-body', dialogBodyClassName)}
            style={dialogBodyStyle}
          >
            {children}
          </div>
          {maybeRenderFooter(props)}
        </div>
      </div>
    </Container>
  );
};

ModalDialog.propTypes = {
  children: PropTypes.node,
  dialogBodyClassName: PropTypes.string,
  dialogBodyStyle: PropTypes.object,
  dialogClassName: PropTypes.string,
  dialogContentClassName: PropTypes.string,
  dialogContentStyle: PropTypes.object,
  dialogHeaderClassName: PropTypes.string,
  dialogHeaderStyle: PropTypes.object,
  dialogStyle: PropTypes.object,
  dialogTitleClassName: PropTypes.string,
  dialogTitleStyle: PropTypes.object,
  headerContent: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  onHide: PropTypes.func,
};

export default ModalDialog;
