import React from 'react';
import TableFilter from './TableFilter';
import TablePagination from './TablePagination';
import TableRowSelectionPlugin from './TableRowSelectionPlugin';
import { DefaultModules } from 'griddle-render';
import Griddle from 'griddle-react';
import {
  and, always, assoc, chain, dissoc, is, isArrayLike,
  isEmpty, keys, map, merge, or, uniq, zipObj,
} from 'ramda';
import compose from 'recompose/compose';
import cx from 'classnames';
import defaultProps from 'recompose/defaultProps';
import mapProps from 'recompose/mapProps';
import shouldUpdate from 'recompose/shouldUpdate';
import toClass from 'recompose/toClass';
import withProps from 'recompose/withProps';

const { ColumnDefinition, RowDefinition } = DefaultModules;
const NoopComponent = toClass(() => null);

const customFilter = ({ filterable, settings }) =>
  (or(filterable === true, and(isArrayLike(filterable), !isEmpty(filterable))) ?
    withProps({ placeholder: settings.placeholder })(TableFilter) :
    NoopComponent);

const customPagination = ({ pagination }) => (pagination ? TablePagination : NoopComponent);

const columnIsSortable = (c, sortable) =>
  or(sortable === true, isArrayLike(sortable) && new Set(sortable).has(c));

const maybeRenderDefinitions = (props) => {
  const { columns, onClick, sortable, valueField } = props;

  return !valueField ? null : (
    <RowDefinition {...{ onClick }} keyColumn={valueField}>
      {columns.map((c, i) =>
        (<ColumnDefinition {...c} key={i} sortable={columnIsSortable(c, sortable)} />)
      )}
    </RowDefinition>
  );
};

const BaseTable = (props) =>
  <Griddle {...dissoc('columns', props)}>{maybeRenderDefinitions(props)}</Griddle>;

const cColumns = ({ columns, data }) => {
  const xs = columns || uniq(chain(keys, data));

  return is(Object, xs[0]) ? xs : xs.map((c) => ({ displayName: c, id: c }));
};

const cComponents = (props) => ({
  Filter: customFilter(props),
  Pagination: customPagination(props),
  SettingsToggle: NoopComponent,
});

const cData = ({ columns, data }) => {
  const rowTemplate = zipObj(columns.map((c) => c.id), columns.map(always(null)));

  return map((r) => merge(rowTemplate, r), data);
};

const cPlugins = ({ selection }) => (selection ? [TableRowSelectionPlugin] : []);

const cSettings = ({ selectMultiple }) => ({
  selectMultiple: !(selectMultiple === false),
  useGriddleStyles: false,
});

const cStyle = ({ className }) => ({
  classNames: { table: cx('table', className), tableHeadingCell: 'sort' },
});

const computedProps = (baseProps) => {
  const props = assoc('columns', cColumns(baseProps), baseProps);

  return merge(props, {
    components: cComponents(props),
    data: cData(props),
    plugins: cPlugins(props),
    settings: cSettings(props),
    style: cStyle(props),
  });
};

const shouldComponentUpdate = ({ data }, nextProps) => !(data === nextProps.data);

const Table = compose(
  defaultProps({ settings: {} }),
  mapProps(computedProps),
  shouldUpdate(shouldComponentUpdate)
)(BaseTable);

export default Table;
