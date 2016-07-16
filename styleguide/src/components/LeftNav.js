import React from 'react';
import { Link } from 'react-router';

const styles = {
  root: { padding: 20 },
  title: {
    borderBottom: '1px solid #eee',
    fontSize: '2em',
    lineHeight: 1.25,
    paddingBottom: '0.3em',
  },
};

const LeftNav = () => (
  <aside className="col-xs-3" style={styles.root}>
    <h1 style={styles.title}><Link to={'/'}>Core UI</Link></h1>
    <Link to={'/components/button'}><h3>Button</h3></Link>
    <Link to={'/components/calendar-input'}><h3>Calendar Input</h3></Link>
    <Link to={'/components/combobox-input'}><h3>Combobox Input</h3></Link>
    <Link to={'/components/date-time-picker-input'}><h3>DateTimePicker Input</h3></Link>
    <Link to={'/components/dropdown-list-input'}><h3>DropdownList Input</h3></Link>
    <Link to={'/components/form'}><h3>Form</h3></Link>
    <Link to={'/components/label'}><h3>Label</h3></Link>
    <Link to={'/components/modal'}><h3>Modal</h3></Link>
    <Link to={'/components/multiselect-input'}><h3>Multiselect Input</h3></Link>
    <Link to={'/components/number-picker-input'}><h3>NumberPicker Input</h3></Link>
    <Link to={'/components/select-list-input'}><h3>SelectList Input</h3></Link>
    <Link to={'/components/table'}><h3>Table</h3></Link>
    <Link to={'/components/tabs'}><h3>Tabs</h3></Link>
    <Link to={'/components/text-input'}><h3>Text Input</h3></Link>
  </aside>
);

export default LeftNav;
