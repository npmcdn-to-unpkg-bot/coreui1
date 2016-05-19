import React, { Children, PropTypes } from 'react';
import Shared from '../../Shared';
import AriaTabPanel from 'react-aria-tabpanel';
import defaultTheme from 'theme/components/Tabs';
import cx from 'classnames/dedupe';
import mapProps from 'recompose/mapProps';
import uncontrollable from 'uncontrollable';
import { merge, partial } from 'ramda';

const systemStyles = { };

const renderTabPanel = (activeTabId, { props: { children, tabKey } }) => {
  const active = tabKey === activeTabId;

  return (
    <AriaTabPanel.TabPanel active={active} className={cx('tab-pane', { active })} tabId={tabKey}>
      {children}
    </AriaTabPanel.TabPanel>
  );
};

const renderTab = (activeTabId, { props: { tabKey, text } }) => (
  <li className="nav-item">
    <AriaTabPanel.Tab
      className={cx('nav-link', { active: tabKey === activeTabId })}
      id={tabKey}
      style={{ cursor: 'pointer', outline: 'none' }}
      tag="span"
    >
      {text}
    </AriaTabPanel.Tab>
  </li>
);

const TabsWrapper = (props) => {
  const { activeTabId, children: wrapperChildren, externalContent, className, onChange } = props;

  return (
    <AriaTabPanel.Wrapper {...{ activeTabId, onChange }}>
      <AriaTabPanel.TabList>
        <ul className={cx('nav', 'nav-tabs', className)}>
          {Children.map(wrapperChildren, partial(renderTab, [activeTabId]))}
        </ul>
      </AriaTabPanel.TabList>
      {!externalContent && (
        <div className="tab-content pad-y">
          {Children.map(wrapperChildren, partial(renderTabPanel, [activeTabId]))}
        </div>
      )}
    </AriaTabPanel.Wrapper>
  );
};

TabsWrapper.defaultProps = { externalContent: false };

TabsWrapper.propTypes = {
  activeTabId: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  externalContent: PropTypes.bool,
  onChange: PropTypes.func,
};

const UncontrolledTabsWrapper = uncontrollable(TabsWrapper, { activeTabId: 'onChange' });

const TabPane = () => null;

const TabsContainer = mapProps((props) => {
  const { activeTabKey, className, onChange, sheet, style, theme, ...rest } = props;
  const isControlled = activeTabKey && onChange;
  const defaultActiveTabIdKVP = activeTabKey ? { defaultActiveTabId: activeTabKey } : {};
  const baseProps = {
    className: cx(sheet.classes.tabs, theme.classes.tabs, className),
    style: merge(theme.styles.tabs, style),
    ...rest,
  };
  const controllableProps = isControlled ?
    { activeTabId: activeTabKey, onChange } :
    defaultActiveTabIdKVP;

  return merge(baseProps, controllableProps);
})(UncontrolledTabsWrapper);

const StyledTabs = Shared.useSheet(TabsContainer, systemStyles);

const Tabs = (props) =>
  <StyledTabs {...props}>{props.children}</StyledTabs>;

const classes = defaultTheme.classes;
const options = defaultTheme.options;
const styles = defaultTheme.styles;

Tabs.defaultProps = { theme: { classes, options, styles } };

Tabs.displayName = 'Tabs';

Tabs.propTypes = {
  activeTabKey: PropTypes.string,

  children: PropTypes.node,

  externalContent: PropTypes.bool,

  onChange: PropTypes.func,

  theme: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
};

Tabs.TabPane = TabPane;

export { TabPane };

Shared.registerComponent('Tabs', Tabs);

export default Tabs;
