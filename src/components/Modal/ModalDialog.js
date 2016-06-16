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
  const { displayText, isCancel, isDefault, isFormSubmit, name, ...rest } = buttonData;
  const actionType = buttonData.actionType || (isDefault ? 'primary' : 'secondary');
  const onClick = partial(handleClick, [buttonData.onClick, (isCancel && onHide)]);
  const text = displayText || name;

  return isFormSubmit ?
    <Form.Button {...rest} {...{ actionType }} key={i} type="submit">{text}</Form.Button> :
    <Button {...rest} {...{ actionType, onClick }} key={i} type={isDefault ? 'submit' : 'button'}>
      {text}
    </Button>;
};

const maybeRenderFooter = (props) => {
  const { buttons, dialogFooterClassName, dialogFooterStyle } = props;
  const className = cx('modal-footer', {
    [dialogFooterClassName]: !!dialogFooterClassName, 'text-xs-right': !dialogFooterClassName,
  });
  const Form = Shared.getRegisteredComponents().Form;

  return buttons && buttons.length && (
    <div {...{ className }} style={dialogFooterStyle}>
      {intersperse(' ', buttons.map(partial(renderButton, [props, Form])))}
    </div>
  );
};

const ModalDialog = (props) => {
  const { children, headerContent, sheet, theme } = props;
  const Form = Shared.getRegisteredComponents().Form;
  const Container = Form ? Form.Context : 'div';
  const systemClasses = sheet.classes;
  const { classes: themeClasses, styles: themeStyles } = theme;

  return (
    <Container>
      <div className={cx(systemClasses.dialog, themeClasses.dialog)} style={themeStyles.dialog}>
        <div
          className={cx(systemClasses.dialogContent, themeClasses.dialogContent)}
          style={themeStyles.dialogContent}
        >
          <div
            className={cx(systemClasses.dialogHeader, themeClasses.dialogHeader)}
            style={themeStyles.dialogHeader}
          >
            <button aria-label="Close" className="sr-only" type="button" />
            <h4
              className={cx(systemClasses.dialogTitle, themeClasses.dialogTitle)}
              style={themeStyles.dialogTitle}
            >
              {headerContent}
            </h4>
          </div>
          <div
            className={cx(systemClasses.dialogBody, themeClasses.dialogBody)}
            style={themeStyles.dialogBody}
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
  headerContent: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  onHide: PropTypes.func,
  sheet: PropTypes.object,
  theme: PropTypes.object,
};

export default ModalDialog;
