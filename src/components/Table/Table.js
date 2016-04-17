import React, { PropTypes } from 'react';
import Button from 'components/Button';
import NumberPickerInput from 'components/NumberPickerInput';
import TextInput from 'components/TextInput';
import tableHandlers from './TableHandlers';
import tableHelpers from './TableHelpers';
import compose from 'recompose/compose';
import cx from 'classnames';
import defaultProps from 'recompose/defaultProps';
import mapProps from 'recompose/mapProps';
import withHandlers from 'recompose/withHandlers';
import withState from 'recompose/withState';
import { inc, is, partial } from 'ramda';

const maybeRenderPager = (baseTableProps) => {
  const {
    maxPage, onPageChange, onNextPageClick,
    onPrevPageClick, pageIndex, pagination,
  } = baseTableProps;

  const pageNumber = inc(pageIndex);
  const nextDisabled = pageNumber === maxPage;
  const prevDisabled = pageIndex === 0;

  return pagination && (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Button
        className={cx('btn-link', { disabled: prevDisabled })}
        onClick={onPrevPageClick}
        style={{ color: prevDisabled ? '#ccc' : '#2975e9' }}
      >
        Prev
      </Button>
      <NumberPickerInput
        max={maxPage}
        min={1}
        onChange={onPageChange}
        style={{ maxWidth: 100 }}
        value={is(Number, pageIndex) ? pageNumber : pageIndex}
      />
      <Button
        className={cx('btn-link', { disabled: nextDisabled })}
        onClick={onNextPageClick}
        style={{ color: nextDisabled ? '#ccc' : '#2975e9' }}
      >
        Next
      </Button>
    </div>
  );
};

const maybeRenderSearch = (baseTableProps) => {
  const { onSearchChange, searchable, searchPlaceholder, searchValue } = baseTableProps;

  return searchable && (
    <div className="form-group">
      <TextInput
        onChange={onSearchChange}
        placeholder={searchPlaceholder}
        style={{ maxWidth: 300 }}
        type="search"
        value={searchValue}
      />
    </div>
  );
};

const maybeRenderSortIcons = (baseTableProps, { id, isSortable }) => {
  const { sortAscending, sortField } = baseTableProps;
  const isSorted = (sortField === id);
  const className = isSortable && cx('icon', {
    'icon-chevron-down': isSorted && !sortAscending,
    'icon-chevron-up': isSorted && sortAscending,
    'icon-chevrons-vertical': !isSorted,
  });

  return isSortable && <span {...{ className }} />;
};

const renderHeaderCell = (baseTableProps, c, i) => {
  const { onHeaderClick } = baseTableProps;
  const { isSortable } = c;

  return (
    <th
      key={i}
      onClick={() => isSortable && onHeaderClick(c)}
      style={{ cursor: isSortable ? 'pointer' : 'normal' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {c.displayName}
        {maybeRenderSortIcons(baseTableProps, c)}
      </div>
    </th>
  );
};

const renderRow = (baseTableProps, data, i) => {
  const { columns, onRowClick, selectedRows, selection, valueField } = baseTableProps;
  const rowId = valueField && data[valueField];

  return (
    <tr
      className={cx({ 'table-active': valueField && selectedRows.has(rowId) })}
      key={valueField ? rowId : i}
      onClick={() => selection && valueField && onRowClick(data)}
    >
      {columns.map((c) => <td key={c.id}>{data[c.id]}</td>)}
    </tr>
  );
};

const BaseTable = (props) => {
  const { className, columns, data } = props;

  return (
    <div>
      {maybeRenderSearch(props)}
      <table {...{ className }}>
        <thead><tr>{columns.map(partial(renderHeaderCell, [props]))}</tr></thead>
        <tbody>
          {data.length ?
            data.map(partial(renderRow, [props])) :
            <tr><td colSpan={columns.length}>No rows to display</td></tr>
          }
        </tbody>
      </table>
      {maybeRenderPager(props)}
    </div>
  );
};

BaseTable.propTypes = {
  className: PropTypes.string,
  columns: PropTypes.array,
  data: PropTypes.array.isRequired,
  onHeaderClick: PropTypes.func,
  onNextPageClick: PropTypes.func,
  onPageChange: PropTypes.func,
  onPrevPageClick: PropTypes.func,
  onRowClick: PropTypes.func,
  onSearchChange: PropTypes.func,
  pageIndex: PropTypes.number,
  pageSize: PropTypes.number,
  prevPageIndex: PropTypes.number,
  searchable: PropTypes.oneOfType([PropTypes.bool, PropTypes.instanceOf(Set)]),
  searchPlaceholder: PropTypes.string,
  searchValue: PropTypes.string,
  selectedRows: PropTypes.instanceOf(Set),
  selection: PropTypes.bool,
  selectMultiple: PropTypes.bool,
  sortable: PropTypes.oneOfType([PropTypes.bool, PropTypes.instanceOf(Set)]),
  sortAscending: PropTypes.bool,
  sortField: PropTypes.string,
  valueField: PropTypes.string,
};

const Table = compose(
  defaultProps(tableHelpers.tableDefaultProps()),
  withState('pageIndex', 'setPageIndex', 0),
  withState('prevPageIndex', 'setPrevPageIndex', 0),
  withState('searchValue', 'setSearchValue', ''),
  withState('selectedRows', 'setSelectedRows', (props) => new Set(props.selectedRows)),
  withState('sortAscending', 'setSortAscending', (props) => props.sortAscending),
  withState('sortField', 'setSortField', (props) => props.sortField),
  mapProps(partial(tableHelpers.normalizedProps, [tableHelpers])),
  withHandlers(tableHandlers(tableHelpers))
)(BaseTable);

Table.propTypes = {
  className: PropTypes.string,
  columns: PropTypes.array,
  data: PropTypes.array.isRequired,
  onClick: PropTypes.func,
  onSort: PropTypes.func,
  pageSize: PropTypes.number,
  pagination: PropTypes.bool,
  searchable: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  searchPlaceholder: PropTypes.string,
  selectedRows: PropTypes.instanceOf(Set),
  selection: PropTypes.bool,
  selectMultiple: PropTypes.bool,
  sortable: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  sortAscending: PropTypes.bool,
  sortField: PropTypes.bool,
  valueField: PropTypes.string,
};

export default Table;
