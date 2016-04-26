import React, { Children, PropTypes } from 'react';
import AriaTabPanel from 'react-aria-tabpanel';
import compose from 'recompose/compose';
import cx from 'classnames';
import withHandlers from 'recompose/withHandlers';
import withState from 'recompose/withState';
import { partial } from 'ramda';

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

const TabsBase = compose(
  withState('activeTabId', 'handleTabChange', props => props.activeTabKey),
  withHandlers({
    onChange: props => activeTab => {
      props.handleTabChange(activeTab);
    },
  })
)(TabsWrapper);

const Tabs = (props) => <TabsBase {...props}>{props.children}</TabsBase>;

Tabs.propTypes = { activeTabKey: PropTypes.string, children: PropTypes.node };

Tabs.TabPane = TabPane;

export { TabPane };
export default Tabs;
