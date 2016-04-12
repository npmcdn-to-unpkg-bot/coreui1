import React, { PropTypes } from 'react';
import Button from 'components/Button';
import Shared from '../../Shared';
import cx from 'classnames';
import { intersperse, is, partial } from 'ramda';

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

const ModalDialog = (props) => {
  const { children, headerContent, style } = props;
  const { bodyStyle, classNames, contentStyle, dialogStyle, headerStyle, titleStyle } = style;
  const { body, content, dialog, header, title } = classNames;
  const Form = Shared.getRegisteredComponents().Form;
  const Container = Form ? Form.Context : 'div';

  return (
    <Container>
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
    </Container>
  );
};

ModalDialog.propTypes = {
  children: PropTypes.node,
  headerContent: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  style: PropTypes.object,
};

export default ModalDialog;
