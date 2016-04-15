import React, { Children, PropTypes } from 'react';
import AriaTabPanel from 'react-aria-tabpanel';
import cx from 'classnames';
import compose from 'recompose/compose';
import defaultProps from 'recompose/defaultProps';
import mapProps from 'recompose/mapProps';
import { assoc, evolve } from 'ramda';

const Tab = compose(
  defaultProps({ className: 'Tabs-tab' }),
  mapProps((props) => evolve({
    className: (s) => cx(s, { 'is-active': props.activeTabKey === props.tabKey }),
  }, props))
)(AriaTabPanel.Tab);

const renderPanel = ({ content, id }) =>
  <AriaTabPanel.TabPanel key={id} tabId={id}>{content}</AriaTabPanel.TabPanel>;

const renderTab = ({ id, title }) => (
  <li className="Tabs-tablistItem" key={id}>
    <Tab {...{ id }}>{title}</Tab>
  </li>
);

const renderData = ({ data, externalContent }) => {
  const tabList = (
    <AriaTabPanel.TabList key="tab-list">
      <ul className="Tabs-tabList">{data.map(renderTab)}</ul>
    </AriaTabPanel.TabList>
  );

  const tabsPanel = !externalContent && (
    <div className="Tabs-panel" key="tabs-panel">
      {data.map(renderPanel)}
    </div>
  );

  return [tabList, tabsPanel];
};

const toData = ({ props }) => {
  const { children, tabKey, text } = props;

  return ({ content: children, id: tabKey, title: text });
};

const normalizeChildren = (props) =>
  assoc('data', Children.map(props.children, toData), props);

const TabPane = () => null;

const Tabs = (props) => (
  <AriaTabPanel.Wrapper>
    {renderData(Children.count(props.children) ? normalizeChildren(props) : props)}
  </AriaTabPanel.Wrapper>
);

Tabs.propTypes = { children: PropTypes.node };

Tabs.TabPane = TabPane;

export { TabPane };
export default Tabs;
