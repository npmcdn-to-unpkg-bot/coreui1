import React from 'react';
import { IndexRoute, Route, Redirect } from 'react-router';

import Master from './components/Master';

import ButtonPage from './components/pages/components/Button/Page';
import CalendarInputPage from './components/pages/components/CalendarInput/Page';
import ComboboxInputPage from './components/pages/components/ComboboxInput/Page';
import DateTimePickerInputPage from './components/pages/components/DateTimePickerInput/Page';
import DropdownListInputPage from './components/pages/components/DropdownListInput/Page';
import FormPage from './components/pages/components/Form/Page';
import LabelPage from './components/pages/components/Label/Page';
import ModalPage from './components/pages/components/Modal/Page';
import MultiselectInputPage from './components/pages/components/MultiselectInput/Page';
import NumberPickerInputPage from './components/pages/components/NumberPickerInput/Page';
import SelectListInputPage from './components/pages/components/SelectListInput/Page';
import TablePage from './components/pages/components/Table/Page';
import TabsPage from './components/pages/components/Tabs/Page';
import TextInputPage from './components/pages/components/TextInput/Page';

const Routes = (
  <Route path="/" component={Master}>
    <IndexRoute component={ButtonPage} />
    <Redirect from="components" to="/components/button" />
    <Route path="components">
      <Route path="button" component={ButtonPage} />
      <Route path="calendar-input" component={CalendarInputPage} />
      <Route path="combobox-input" component={ComboboxInputPage} />
      <Route path="date-time-picker-input" component={DateTimePickerInputPage} />
      <Route path="dropdown-list-input" component={DropdownListInputPage} />
      <Route path="form" component={FormPage} />
      <Route path="label" component={LabelPage} />
      <Route path="modal" component={ModalPage} />
      <Route path="multiselect-input" component={MultiselectInputPage} />
      <Route path="number-picker-input" component={NumberPickerInputPage} />
      <Route path="select-list-input" component={SelectListInputPage} />
      <Route path="table" component={TablePage} />
      <Route path="tabs" component={TabsPage} />
      <Route path="text-input" component={TextInputPage} />
    </Route>
  </Route>
);

export default Routes;
