import { PropTypes } from 'react';
import Button from 'components/Button';
import Shared from '../../Shared';
import RFForm, {
  addInputTypes, Button as RFFormButton, Context, Field, Message, Summary, Trigger,
} from 'react-formal';
import compose from 'recompose/compose';
import cx from 'classnames';
import defaultProps from 'recompose/defaultProps';
import getContext from 'recompose/getContext';
import lifecycle from 'recompose/lifecycle';
import mapProps from 'recompose/mapProps';
import toClass from 'recompose/toClass';
import withHandlers from 'recompose/withHandlers';
import { evolve, is, partial, path } from 'ramda';

const handleSubmit = ({ coreuiModalContext, onSubmit }, formValue) => {
  if (!coreuiModalContext) {
    onSubmit(formValue);
  } else {
    const event = new CustomEvent(
      'coreuiSubmit',
      { bubbles: true, cancelable: true, detail: { stopPropagation: false } },
    );

    const onHide = coreuiModalContext.onHide;

    onSubmit(formValue, event);

    if (is(Function, onHide) && !path(['detail, stopPropagation'], event)) {
      onHide(event);
    }
  }
};

const setup = () => {
  const {
    CalendarInput, ComboboxInput, DateTimePickerInput, DropdownListInput,
    MultiselectInput, NumberPickerInput, SelectListInput, TextInput,
  } = Shared.getRegisteredComponents();

  const inputs = [
    { component: CalendarInput, types: ['calendar'] },
    { component: ComboboxInput, types: ['combobox'] },
    { component: DateTimePickerInput,
      types: ['date', 'time', 'datepicker', 'datetimepicker', 'timepicker'],
    },
    { component: DropdownListInput, types: ['dropdownlist'] },
    { component: MultiselectInput, types: ['array', 'multiselect'] },
    { component: NumberPickerInput, types: ['number'] },
    { component: SelectListInput, types: ['selectlist'] },
    {
      component: TextInput,
      types: ['email', 'password', 'search', 'string', 'tel', 'text', 'url'],
    },
  ];

  inputs.forEach(({ component, types }) => {
    if (component) {
      types.forEach((t) => addInputTypes({ [t]: toClass(component) }));
    }
  });
};

const FormButton = compose(
  defaultProps({ className: '', component: Button }),
  mapProps((props) => evolve({
    className: (s) => cx({ 'btn-primary': props.type === 'submit' }, s),
  }, props))
)(RFFormButton);

const FormField = defaultProps({ errorClass: 'has-danger' })(Field);

const FormMessage = compose(
  defaultProps({ className: '', errorClass: 'has-danger' }),
  mapProps((props) => evolve({ className: (s) => cx('form-msg', s) }, props))
)(Message);

const Form = compose(
  getContext({ coreuiModalContext: PropTypes.object }),
  withHandlers({ onSubmit: (props) => partial(handleSubmit, [props]) }),
  lifecycle(setup, Function.prototype)
)(RFForm);

Form.addInputTypes = addInputTypes;
Form.Button = FormButton;
Form.Context = Context;
Form.Field = FormField;
Form.Message = FormMessage;
Form.Summary = Summary;
Form.Trigger = Trigger;

Shared.registerComponent('Form', Form);

export {
  addInputTypes, FormButton as Button, Context, FormField as Field,
  FormMessage as Message, Summary, Trigger,
};

export default Form;
