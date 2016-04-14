import React, { PropTypes } from 'react';
import TextInput from 'components/TextInput';

const TableFilter = ({ events, placeholder }) => (
  <div className="form-group" style={{ maxWidth: 400 }}>
    <TextInput {...{ placeholder }} onChange={events.setFilter} />
  </div>
);

TableFilter.propTypes = { events: PropTypes.object, placeholder: PropTypes.string };

export default TableFilter;
