import React from 'react';
import { assocPath } from 'ramda';

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
  const isCurrent = row.get('griddleKey') === griddleKey;

  return row.set('selected', isCurrent ? !isSelected : isSelected);
};

const getTemplateSingleSelection = (griddleKey, row) =>
  row.set('selected', row.get('griddleKey') === griddleKey);

const griddleRowSelectionToggled = (state, action) => {
  const { griddleKey, selectMultiple } = action;
  const template = selectMultiple ? getTemplate : getTemplateSingleSelection;

  return state.set('data', selectRow(state.get('data'), griddleKey, template));
};

const toggleRowSelection = ({ griddleKey, selectMultiple }) => ({
  griddleKey, selectMultiple, type: GRIDDLE_ROW_SELECTION_TOGGLED,
});

const TableRowSelectionPlugin = {
  actions: { toggleRowSelection },
  components: { Row: createRow },
  constants: { GRIDDLE_ROW_SELECTION_TOGGLED },
  helpers: {},
  name: 'RowSelection',
  states: {},
  reducers: { GRIDDLE_ROW_SELECTION_TOGGLED: griddleRowSelectionToggled },
};

export default TableRowSelectionPlugin;
