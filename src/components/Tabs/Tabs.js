import React, { Children, PropTypes } from 'react';
import Shared from '../../Shared';
import AriaTabPanel from 'react-aria-tabpanel';
import defaultTheme from 'theme/components/Tabs';
import compose from 'recompose/compose';
import cx from 'classnames/dedupe';
import mapProps from 'recompose/mapProps';
import withHandlers from 'recompose/withHandlers';
import withState from 'recompose/withState';
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

const TabsWrapper = ({ activeTabId, children: wrapperChildren, className, onChange }) => (
  <AriaTabPanel.Wrapper {...{ activeTabId, onChange }}>
    <AriaTabPanel.TabList>
      <ul className={cx('nav', 'nav-tabs', className)}>
        {Children.map(wrapperChildren, partial(renderTab, [activeTabId]))}
      </ul>
    </AriaTabPanel.TabList>
    <div className="tab-content pad-y">
      {Children.map(wrapperChildren, partial(renderTabPanel, [activeTabId]))}
    </div>
  </AriaTabPanel.Wrapper>
);

TabsWrapper.propTypes = {
  activeTabId: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  onChange: PropTypes.func,
};

const TabPane = () => null;

const TabsContainer = compose(
  withState('activeTabId', 'handleTabChange', props => props.activeTabKey),
  withHandlers({
    onChange: props => activeTab => {
      props.handleTabChange(activeTab);
    },
  }),
  mapProps(({ className, sheet, style, theme, ...rest }) => ({
    className: cx(sheet.classes.tabs, theme.classes.tabs, className),
    style: merge(theme.styles.tabs, style),
    ...rest,
  }))
)(TabsWrapper);

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

  theme: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
};

Tabs.TabPane = TabPane;

export { TabPane };

Shared.registerComponent('Tabs', Tabs);

export default Tabs;
