// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { reduxForm, submit } from 'redux-form';
import i18n from 'react-native-i18n';
import moment from 'moment';

import AppointmentForm from '../components/AppointmentForm';
import validate from '../lib/validateAppointmentForm';
import { WEEKLY } from '../lib/recurrence';
import { RECURRENCE_PICKER } from '../screens';
import { navBar } from '../themes';

export type AppointmentFormInput = AppointmentInput & {
  id?: string,
  course?: string,
};

type OwnProps = {
  index?: number,
  initialValues?: Object,
  onSubmit: (input: AppointmentFormInput, index: number | void) => void,
};

type Props = OwnProps & {
  dispatch: Function,
  navigator: NativeNavigator,
};

const DecoratedAppointmentForm: () => React.Node = reduxForm({
  form: 'appointmentForm',
  validate,
})(AppointmentForm);

// exported for tests
export class AppointmentFormScreen extends React.Component<Props, {}> {
  static navigatorStyle = navBar;
  static navigatorButtons = {
    rightButtons: [
      {
        id: 'save',
        title: i18n.t('save'),
      },
    ],
  };

  constructor(props: Props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this._handleNavigatorEvent);
  }

  _handleNavigatorEvent = event => {
    const { dispatch } = this.props;
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'save') {
        dispatch(submit('appointmentForm'));
      }
    }
  };

  _getInitialValues = (currentTime: moment) => {
    const startOfHour = currentTime.clone().startOf('hour');
    const startOfDay = currentTime.clone().startOf('day');
    return {
      starttime: startOfHour,
      endtime: startOfHour.clone().add(1, 'hour'),
      startdate: startOfDay,
      enddate: startOfDay.clone().add(15, 'weeks'),
      recurrence: WEEKLY,
    };
  };

  render() {
    const { index, initialValues, navigator, onSubmit } = this.props;
    return (
      <DecoratedAppointmentForm
        onSubmit={values => onSubmit(values, index)}
        initialValues={{
          ...this._getInitialValues(moment()),
          ...initialValues,
        }}
        onRecurrencePress={input =>
          navigator.push({
            screen: RECURRENCE_PICKER,
            title: i18n.t('repeat'),
            passProps: {
              input,
            },
          })
        }
      />
    );
  }
}

const ConnectedAppointmentFormScreen: (
  props: OwnProps,
) => React$Element<any> = connect()(AppointmentFormScreen);

export default ConnectedAppointmentFormScreen;
