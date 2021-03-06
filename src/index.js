import Button from './components/Button';
import CalendarInput from './components/CalendarInput';
import ComboboxInput from './components/ComboboxInput';
import DateTimePickerInput from './components/DateTimePickerInput';
import DropdownListInput from './components/DropdownListInput';
import Form from './components/Form';
import Label from './components/Label';
import Modal from './components/Modal';
import MultiselectInput from './components/MultiselectInput';
import NumberPickerInput from './components/NumberPickerInput';
import SelectListInput from './components/SelectListInput';
import Table from './components/Table';
import Tabs from './components/Tabs';
import TextInput from './components/TextInput';
import momentLocalizer from 'react-widgets/lib/localizers/moment';
import numberLocalizer from 'react-widgets/lib/localizers/simple-number';

const localizers = { momentLocalizer, numberLocalizer };

export { Button };
export { CalendarInput };
export { ComboboxInput };
export { DateTimePickerInput };
export { DropdownListInput };
export { Form };
export { Label };
export { Modal };
export { MultiselectInput };
export { NumberPickerInput };
export { SelectListInput };
export { Table };
export { Tabs };
export { TextInput };
export { localizers };

export default {
  Button, CalendarInput, ComboboxInput, DateTimePickerInput,
  DropdownListInput, Form, Label, Modal, MultiselectInput,
  NumberPickerInput, SelectListInput, Table, Tabs, TextInput,
  localizers,
};
