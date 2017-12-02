// @flow
import { connect } from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form';
import RecurrencePickerList from '../components/RecurrencePickerList';

type OwnProps = {
  input: {
    onChange: (value: 'WEEKLY' | 'BIWEEKLY') => void,
  },
  navigator: NativeNavigator,
};

/**
 * connected as form: 'appointmentForm' because it is part of appointmentForm,
 * just displayed on another screen
 */
const DecoratedRecurrencePicker: () => React$Element<any> = reduxForm({
  form: 'appointmentForm',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(RecurrencePickerList);

const appointmentFormSelector = formValueSelector('appointmentForm');

function mapStateToProps(
  state: ApplicationState,
  { input, navigator }: OwnProps,
) {
  return {
    onSelect: (value: 'WEEKLY' | 'BIWEEKLY') => {
      input.onChange(value);
      navigator.pop();
    },
    selectedRecurrence: appointmentFormSelector(state, 'recurrence'),
  };
}

export default connect(mapStateToProps)(DecoratedRecurrencePicker);
