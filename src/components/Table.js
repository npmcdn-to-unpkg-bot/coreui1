import React, { Component, PropTypes } from 'react';
import TextInput from 'components/TextInput';
import { DefaultModules } from 'griddle-render';
import Griddle from 'griddle-react';
import {
  and, always, assocPath, chain, dissoc, equals, isArrayLike, isEmpty,
  keys, map, merge, or, partial, uniq, when, zipObj,
} from 'ramda';
import compose from 'recompose/compose';
import cx from 'classnames';
import mapProps from 'recompose/mapProps';
import shouldUpdate from 'recompose/shouldUpdate';
import toClass from 'recompose/toClass';
import withProps from 'recompose/withProps';

const { ColumnDefinition, RowDefinition } = DefaultModules;
const NoopComponent = toClass(() => null);

const columnIsSortable = (c, sortable) =>
  or(
    equals(true, sortable),
    isArrayLike(sortable) &&
      new Set(sortable).has(c)
  );

const maybeRenderDefinitions = (props) => {
  const { columns, onClick, sortable, valueField } = props;

  return when(
    () => and(columns, valueField),
    () => (
      <RowDefinition {...{ onClick }} keyColumn={valueField}>
        {columns.map((c) => (
          <ColumnDefinition {...c} sortable={columnIsSortable(c, sortable)} />
        ))}
      </RowDefinition>
    )
  )(null);
};

const BaseTable = (props) => (
  <div className="">
    <Griddle {...props}>{maybeRenderDefinitions(props)}</Griddle>
  </div>
);

BaseTable.defaultProps = {
  settings: {},
};

const baseProps = (props) =>
  merge(BaseTable.defaultProps,
    (props.columns && props.valueField) ?
    dissoc('columns', dissoc('valueField', props)) :
    props
  );

const CustomFilter = ({ events, placeholder }) => (
  <div className="form-group" style={{ maxWidth: 400 }}>
    <TextInput {...{ placeholder }} onChange={events.setFilter} />
  </div>
);

CustomFilter.propTypes = {
  events: PropTypes.object,
  placeholder: PropTypes.string,
};

const customFilter = ({ filterable, settings }) =>
  when(
    () => or(
      equals(true, filterable),
      and(isArrayLike(filterable), !isEmpty(filterable))
    ),
    () => withProps({ placeholder: settings.placeholder }, CustomFilter)
  )(NoopComponent);

class CustomPagination extends Component {
  componentWillMount = () => {
    const { events, settings } = this.props;
    events.setPageSize(settings.pageSize);
  }

  render = () => {
    const { events, pageProperties } = this.props;
    const { getNextPage, getPage, getPreviousPage } = events;
    const { currentPage, maxPage } = pageProperties;

    return (
      <div className="pagination">
        <div
          className={cx('left', when(() => equals(1, currentPage), () => 'disabled')(null))}
          onClick={getPreviousPage}
        >
          <span className="icon icon-backward" />
          <span>Previous</span>
        </div>
        <div className="page">
          <div>
            <TextInput max={maxPage} min={1} onChange={getPage} type="number" value={currentPage} />
            <div><span>of {maxPage}</span></div>
          </div>
        </div>
        <div
          className={cx('right', when(() => equals(maxPage, currentPage), () => 'disabled')(null))}
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
  events: PropTypes.object,
  pageProperties: PropTypes.object,
  settings: PropTypes.object,
};

const customPagination = ({ pagination }) =>
  when(() => pagination, () => CustomPagination)(NoopComponent);

const GRIDDLE_ROW_SELECTION_TOGGLED = 'GRIDDLE_ROW_SELECTION_TOGGLED';

const handleClick = ({ events, rowData, settings }) => {
  events.toggleRowSelection({
    griddleKey: rowData.__metadata.griddleKey,
    selectMultiple: settings.selectMultiple,
  });
};

const createRow = (Row) =>
  (props) => {
    const { rowData, styles } = props;
    const newStyles = assocPath(
      ['classNames', 'row'],
      when(() => rowData.__metadata.selected, () => 'table-active')(null),
      styles
    );

    return <Row {...props} onClick={() => handleClick(props)} styles={newStyles} />;
  };

const selectRow = (data, griddleKey, template) =>
  map(partial(template, griddleKey), data);

const getTemplate = (griddleKey, row) => {
  const isSelected = row.get('selected');
  const isCurrent = equals(row.get('griddleKey'), griddleKey);

  row.set('selected', isCurrent ? !isSelected : isSelected);
};

const getTemplateSingleSelection = (griddleKey, row) => {
  row.set('selected', equals(row.get('griddleKey'), griddleKey));
};

const griddleRowSelectionToggled = (state, action) => {
  const template = action.selectMultiple ?
    getTemplate :
    getTemplateSingleSelection;

  state.set('data', selectRow(state.get('data'), griddleKey, template));
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

const cComponents = (props) => ({
  Filter: customFilter(props),
  Pagination: customPagination(props),
  SettingsToggle: NoopComponent,
});

const cData = ({ data }) => {
  const columns = uniq(chain(keys, data));

  return map((r) => merge(zipObj(columns, map(always(null), columns)), r), data);
};

const cPlugins = ({ selection }) =>
  when(() => selection, () => [RowSelectionPlugin])([]);

const cSettings = ({ selectMultiple }) => ({
  selectMultiple: !(selectMultiple === false),
  useGriddleStyles: false,
});

const cStyle = ({ className }) => ({
  classNames: {
    table: cx('table', className),
    tableHeadingCell: 'sort',
  },
});

const computedProps = (props) => {
  const p = baseProps(props);

  return merge(p, {
    components: cComponents(p),
    data: cData(p),
    plugins: cPlugins(p),
    settings: cSettings(p),
    style: cStyle(p),
  });
};

const shouldComponentUpdate = ({ data }, nextProps) =>
  !equals(data, nextProps.data);

const Table = compose(
  mapProps(computedProps),
  shouldUpdate(shouldComponentUpdate)
)(BaseTable);

export default Table;
