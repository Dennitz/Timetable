// @flow
import React from 'react';
import { LayoutAnimation } from 'react-native';
import { connect } from 'react-redux';
import uuid from 'uuid/v1';
import {
  arrayPush,
  arrayRemove,
  arrayInsert,
  formValueSelector,
  reduxForm,
  submit,
} from 'redux-form';
import i18n from 'react-native-i18n';

import CourseForm from '../components/CourseForm';
import * as appointmentActions from '../actions/appointment-actions';
import * as courseActions from '../actions/course-actions';
import validate from '../lib/validateCourseForm';
import { APPOINTMENT_FORM } from '../screens';
import { navBar } from '../themes';
import defaultLayoutAnimation from '../lib/defaultLayoutAnimation';
import type AppointmentFormInput from './AppointmentFormScreen';

type Props = {
  appointments: AppointmentsState,
  appointmentFieldArray: Array<AppointmentFormInput>,
  courses: CoursesState,
  courseId?: string,
  dispatch: Function,
  navigator: NativeNavigator,
};

export type CourseFormInput = {
  name: string,
  appointments: Array<AppointmentInput & {
      id?: string,
      course?: string,
    },>,
};

const DecoratedCourseForm: () => React$Element<any> = reduxForm({
  form: 'courseForm',
  validate,
})(CourseForm);

// exported for tests
export class CourseFormScreen extends React.Component<Props, {}> {
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

  _getInitialFieldValues = () => {
    const { courses, appointments, courseId } = this.props;
    if (courseId) {
      const course: Course = courses[courseId];
      if (course) {
        const appointmentFieldValues = course.appointments.map(
          appointmentId => ({
            ...appointments[appointmentId],
            id: undefined,
            course: undefined,
          }),
        );
        return {
          name: course.name,
          appointments: appointmentFieldValues,
        };
      }
    }
    return {};
  };

  _handleNavigatorEvent = event => {
    const { dispatch, navigator } = this.props;
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'cancel') {
        navigator.dismissModal();
      }
      if (event.id === 'save') {
        dispatch(submit('courseForm'));
      }
    }
  };

  // inserts the passed appointment into FieldArray 'appointments' of form 'courseForm'
  // (sorted by day, time, start date, end date)
  _handleAppointmentSubmit = (input: AppointmentFormInput, index?: number) => {
    const { appointmentFieldArray, dispatch, navigator } = this.props;

    let insertIndex;
    if (!appointmentFieldArray) {
      insertIndex = -1;
    } else {
      // find index to sort by day, time and start/end date
      const appointments =
        (index != null &&
          appointmentFieldArray.filter((_, idx) => idx !== index)) ||
        appointmentFieldArray;

      insertIndex = appointments.findIndex(a => {
        if (a.startdate.day() === input.startdate.day()) {
          if (
            a.starttime.isSame(input.starttime, 'minutes') &&
            a.endtime.isSame(input.endtime, 'minutes')
          ) {
            if (a.startdate.isSame(input.startdate, 'day')) {
              return a.enddate.isAfter(input.enddate, 'day');
            }
            return a.startdate.isAfter(input.startdate, 'day');
          }
          return (
            a.starttime.isAfter(input.starttime, 'minutes') &&
            a.endtime.isAfter(input.endtime, 'minutes')
          );
        }
        return a.startdate.day() > input.startdate.day();
      });
    }

    if (index != null) {
      dispatch(arrayRemove('courseForm', 'appointments', index));
    }
    if (insertIndex === -1) {
      dispatch(arrayPush('courseForm', 'appointments', input));
    } else {
      dispatch(arrayInsert('courseForm', 'appointments', insertIndex, input));
    }

    navigator.pop();
    LayoutAnimation.configureNext(defaultLayoutAnimation);
  };

  _handleSubmit = (input: CourseFormInput) => {
    const { name, appointments } = input;
    const { courses, courseId, dispatch, navigator } = this.props;

    if (courseId) {
      dispatch(
        appointmentActions.removeAppointments(
          courses[courseId].appointments,
          courseId,
        ),
      );
    }

    const _courseId = courseId || uuid();
    const appointmentIds = appointments.map(() => uuid());
    dispatch(courseActions.editCourse(name, _courseId, appointmentIds));

    const newAppointments: AppointmentsState = {};
    appointments.forEach((appointment, index) => {
      newAppointments[appointmentIds[index]] = {
        ...appointment,
        id: appointmentIds[index],
        course: _courseId,
      };
    });
    dispatch(appointmentActions.addAppointments(newAppointments));

    // If course was created before and is now being edited, screen is pushed onto nav stack.
    // If course is newly created, screen is shown as modal.
    if (courseId) {
      navigator.pop();
    } else {
      navigator.dismissModal();
    }
  };

  _handleRemoveCourse = () => {
    const { courses, courseId, dispatch, navigator } = this.props;
    if (!courseId) {
      throw new Error(
        'No courseId was passed in. Maybe the remove button should not be displayed',
      );
    }
    const course = courses[courseId];
    dispatch(courseActions.removeCourse(courseId, course.appointments));
    navigator.pop();
  };

  props: Props;

  render() {
    return (
      <DecoratedCourseForm
        onSubmit={this._handleSubmit}
        initialValues={this._getInitialFieldValues()}
        navigateToAppointmentForm={(values, index) => {
          this.props.navigator.push({
            screen: APPOINTMENT_FORM,
            title: i18n.t('appointment'),
            backButtonTitle: i18n.t('cancel'),
            passProps: {
              index,
              initialValues: values,
              onSubmit: this._handleAppointmentSubmit,
            },
          });
        }}
        onRemoveCourse={this._handleRemoveCourse}
        hasRemoveButton={Boolean(this.props.courseId)}
      />
    );
  }
}

const courseFormSelector = formValueSelector('courseForm');

function mapStateToProps(state) {
  return {
    courses: state.courses,
    appointments: state.appointments,
    appointmentFieldArray: courseFormSelector(state, 'appointments'),
  };
}

export default connect(mapStateToProps)(CourseFormScreen);
