import React, { Component, PropTypes } from 'react';
import TextInput from 'components/TextInput';
import { DefaultModules } from 'griddle-render';
import Griddle from 'griddle-react';
import {
  and, always, assoc, assocPath, chain, dissoc, equals, is, isArrayLike,
  isEmpty, keys, map, merge, or, partial, uniq, zipObj,
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

const CustomFilter = ({ events, placeholder }) => (
  <div className="form-group" style={{ maxWidth: 400 }}>
    <TextInput {...{ placeholder }} onChange={events.setFilter} />
  </div>
);

CustomFilter.propTypes = { events: PropTypes.object, placeholder: PropTypes.string };

const customFilter = ({ filterable, settings }) =>
  (or(equals(true, filterable), and(isArrayLike(filterable), !isEmpty(filterable))) ?
    withProps({ placeholder: settings.placeholder })(CustomFilter) :
    NoopComponent);

class CustomPagination extends Component {
  componentWillMount = () => {
    const { events, settings } = this.props;
    events.setPageSize(settings.pageSize || 10);
  }

  render = () => {
    const { data, events, pageProperties, settings } = this.props;
    const { getNextPage, getPage, getPreviousPage } = events;
    const { currentPage, maxPage } = pageProperties;

    return (data.length >= (settings.pageSize || 10)) && (
      <div className="pagination">
        <div
          className={cx('left', equals(1, currentPage) ? 'disabled' : null)}
          onClick={getPreviousPage}
        >
          <span className="icon icon-backward" />
          <span>Previous</span>
        </div>
        <div className="page">
          <div>
            <TextInput max={maxPage} min={1} onChange={getPage} type="number" value={currentPage} />
            <div style={{ whiteSpace: 'nowrap' }}>of {maxPage}</div>
          </div>
        </div>
        <div
          className={cx('right', equals(maxPage, currentPage) ? 'disabled' : null)}
          onClick={getNextPage}
        >
          <span>Next</span>
          <span className="icon icon-forward" />
        </div>
      </div>
    );
  }
}

CustomPagination.propTypes = {
  data: PropTypes.array,
  events: PropTypes.object,
  pageProperties: PropTypes.object,
  settings: PropTypes.object,
};

const customPagination = ({ pagination }) => (pagination ? CustomPagination : NoopComponent);

const GRIDDLE_ROW_SELECTION_TOGGLED = 'GRIDDLE_ROW_SELECTION_TOGGLED';

const handleClick = ({ events, rowData, settings }) =>
  events.toggleRowSelection({
    griddleKey: rowData.__metadata.griddleKey,
    selectMultiple: settings.selectMultiple,
  });

const createRow = (Row) =>
  (props) => {
    const { rowData, styles } = props;
    const newStyles = assocPath(
      ['classNames', 'row'],
      rowData.__metadata.selected ? 'table-active' : null,
      styles
    );

    return <Row {...props} onClick={() => handleClick(props)} styles={newStyles} />;
  };

const selectRow = (data, griddleKey, template) => map(partial(template, [griddleKey]), data);

const getTemplate = (griddleKey, row) => {
  const isSelected = row.get('selected');
  const isCurrent = equals(row.get('griddleKey'), griddleKey);

  return row.set('selected', isCurrent ? !isSelected : isSelected);
};

const getTemplateSingleSelection = (griddleKey, row) =>
  row.set('selected', equals(row.get('griddleKey'), griddleKey));

const griddleRowSelectionToggled = (state, action) => {
  const { griddleKey, selectMultiple } = action;
  const template = selectMultiple ? getTemplate : getTemplateSingleSelection;

  return state.set('data', selectRow(state.get('data'), griddleKey, template));
};

const toggleRowSelection = ({ griddleKey, selectMultiple }) => ({
  griddleKey, selectMultiple, type: GRIDDLE_ROW_SELECTION_TOGGLED,
});

const RowSelectionPlugin = {
  actions: { toggleRowSelection },
  components: { Row: createRow },
  constants: { GRIDDLE_ROW_SELECTION_TOGGLED },
  helpers: {},
  name: 'RowSelection',
  states: {},
  reducers: { GRIDDLE_ROW_SELECTION_TOGGLED: griddleRowSelectionToggled },
};

const columnIsSortable = (c, sortable) =>
  or(equals(true, sortable), isArrayLike(sortable) && new Set(sortable).has(c));

const maybeRenderDefinitions = (props) => {
  const { columns, onClick, sortable, valueField } = props;

  return !valueField ? null : (
    <RowDefinition {...{ onClick }} keyColumn={valueField}>
      {columns.map((c, i) =>
        (<ColumnDefinition {...c} key={i} sortable={columnIsSortable(c, sortable)}/>)
      )}
    </RowDefinition>
  );
};

const BaseTable = (props) => (
  <div className="">
    <Griddle {...dissoc('columns', props)}>{maybeRenderDefinitions(props)}</Griddle>
  </div>
);

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

const cPlugins = ({ selection }) => (selection ? [RowSelectionPlugin] : []);

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

const shouldComponentUpdate = ({ data }, nextProps) => !equals(data, nextProps.data);

const Table = compose(
  defaultProps({ settings: {} }),
  mapProps(computedProps),
  shouldUpdate(shouldComponentUpdate)
)(BaseTable);

export default Table;
