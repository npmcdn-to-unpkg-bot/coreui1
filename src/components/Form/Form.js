import React, { PropTypes } from 'react';
import Button from 'components/Button';
import TextInput from 'components/TextInput';
import Shared from '../../Shared';
import RFForm, {
  addInputTypes, Button as RFFormButton, Context, Field, Message, Summary, Trigger,
} from 'react-formal';
import compose from 'recompose/compose';
import cx from 'classnames';
import defaultProps from 'recompose/defaultProps';
import expr from 'property-expr';
import getContext from 'recompose/getContext';
import lifecycle from 'recompose/lifecycle';
import mapProps from 'recompose/mapProps';
import toClass from 'recompose/toClass';
import withHandlers from 'recompose/withHandlers';
import { is, partial, path as rPath } from 'ramda';

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

    if (is(Function, onHide) && !rPath(['detail', 'stopPropagation'], event)) {
      onHide(event);
    }
  }
};

const setup = () => {
  const {
    CalendarInput, ComboboxInput, DateTimePickerInput, DropdownListInput,
    MultiselectInput, NumberPickerInput, SelectListInput,
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
  defaultProps({ component: Button }),
  mapProps(({ className, type, ...rest }) => ({
    className: cx({ 'btn-primary': type === 'submit' }, className),
    type,
    ...rest,
  }))
)(RFFormButton);

const FormField = defaultProps({ errorClass: 'has-danger' })(Field);

const FormMessage = compose(
  defaultProps({ errorClass: 'has-danger' }),
  mapProps(({ className, ...rest }) => ({
    className: cx('form-msg', className),
    ...rest,
  }))
)(Message);

const FormBase = compose(
  getContext({ coreuiModalContext: PropTypes.object }),
  withHandlers({ onSubmit: (props) => partial(handleSubmit, [props]) }),
  lifecycle(setup, Function.prototype)
)(RFForm);

const Form = (props) => <FormBase {...props}>{props.children}</FormBase>;

Form.Button = FormButton;
Form.Context = Context;
Form.Field = FormField;
Form.Message = FormMessage;
Form.Summary = Summary;
Form.Trigger = Trigger;

Form.addInputTypes = addInputTypes;

Form.defaultProps = {
  component: 'form',
  delay: 300,
  getter: (path, model) => (path ? expr.getter(path, true)(model || {}) : model),
  strict: false,
};

Form.displayName = 'Form';

Form.propTypes = {
  children: PropTypes.node,

  className: PropTypes.string,

  /**
   * A tag name or Component class the Form should render.
   *
   * If `null` are `false` the form will simply render it's child. In
   * this instance there must only be one child.
   */
  component: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
    PropTypes.oneOf([null, false]),
  ]).isRequired,

  /**
   * Time in milliseconds that validations should be debounced. Reduces the amount of validation calls
   * made at the expense of a slight delay. Helpful for performance.
   */
  delay: PropTypes.number,

  /**
   * An object hash of field errors for the form. The object should be keyed with paths
   * with the values being an array of messages or message objects. Errors can be
   * left [uncontrolled](/controllables) (use `defaultErrors` to set an initial value)
   * or managed along with the `onError` callback. You can use any object shape you'd like for
   * messages, as long as you provide the Form.Message component an `extract` prop that
   * understands how to pull out the strings message. By default it understands strings and objects
   * with a `'message'` property.
   *
   * ```js
   * <Form errors={{
     *  "name.first": [
     *    'First names are required',
     *    {
     *    	message: "Names must be at least 2 characters long",
     *    	type: 'min'
     *    }
     *  ],
     * }}/>
   * ```
   */
  errors: PropTypes.object,

  /**
   * A value getter function. `getter` is called with `path` and `value` and
   * should return the plain **javascript** value at the path.
   *
   * ```js
   * function(
   *  path: string,
   *  value: any,
   * ) -> object
   * ```
   */
  getter: PropTypes.func,

  /**
   * Turns off input validation for the Form, value updates will continue to work.
   */
  noValidate: PropTypes.bool,

  /**
   * Callback that is called when the `value` prop changes.
   *
   * ```js
   * function(
   *   value: object,
   *   updatedPaths: array<string>
   * )
   * ```
   */
  onChange: PropTypes.func,

  /**
   * Callback that is called when a validation error occurs. It is called with an `errors` object
   *
   * ```editable
   * <Form schema={modelSchema}
   *   defaultValue={modelSchema.default()}
   *   errors={this.state ? this.state.errors : {}}
   *   onError={errors => {
     *     if( errors.dateOfBirth )
     *       errors.dateOfBirth = 'hijacked!'
     *     this.setState({ errors })
     *   }}>
   *
   *   <Form.Field name='dateOfBirth'/>
   *   <Form.Message for='dateOfBirth'/>
   *
   *   <Form.Button type='submit'>Submit</Form.Button>
   * </Form>
   * ```
   */
  onError: PropTypes.func,

  /**
   * Callback that is fired when the native onSubmit event is triggered. Only relevant when
   * the `component` prop renders a `<form/>` tag. onInvalidSubmit will trigger only if the form is invalid.
   *
   * ```js
   * function onInvalidSubmit(errors){
     *   // do something with errors
     * }
   * ```
   */
  onInvalidSubmit: PropTypes.func,

  /**
   * Callback that is fired when the native onSubmit event is triggered. Only relevant when
   * the `component` prop renders a `<form/>` tag. onSubmit will trigger only if the form is valid.
   *
   * ```js
   * function onSubmit(formValue){
     *   // do something with valid value
     * }
   * ```
   */
  onSubmit: PropTypes.func,

  /**
   * Callback that is called whenever a validation is triggered.
   * It is called _before_ the validation is actually run.
   * ```js
   * function onValidate(event){
     *   let { type, fields, args } = event
     * }
   * ```
   */
  onValidate: PropTypes.func,

  /**
   * A Yup schema  that validates the Form `value` prop. Used to validate the form input values
   * For more information about the yup api check out: https://github.com/jquense/yup/blob/master/README.md
   * @type {YupSchema}
   */
  schema: PropTypes.any,

  /**
   * A value setter function. `setter` is called with `path`, the form `value` and the path `value`.
   * The `setter` must return updated form `value`, which allows you to leave the original value unmutated.
   *
   * The default implementation uses the [react immutability helpers](http://facebook.github.io/react/docs/update.html),
   * letting you treat the form `value` as immutable.
   * ```js
   * function(
   *  path: string,
   *  formValue: object,
   *  pathValue: any
   * ) -> object
   * ```
   */
  setter: PropTypes.func,

  /**
   * Validations will be strict, making no attempt to coarce input values to the appropriate type.
   */
  strict: PropTypes.bool,

  /**
   * Form value object, can be left [uncontrolled](/controllables);
   * use the `defaultValue` prop to initialize an uncontrolled form.
   */
  value: PropTypes.object,
};

Shared.registerComponent('Form', Form);

export {
  addInputTypes, FormButton as Button, Context, FormField as Field,
  FormMessage as Message, Summary, Trigger,
};

export default Form;
