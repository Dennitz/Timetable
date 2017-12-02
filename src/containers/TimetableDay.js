// @flow
import React from 'react';
import { connect } from 'react-redux';

import CourseAppointment from '../components/CourseAppointment';
import DayBorder from '../components/DayBorder';

/* eslint-disable react/no-unused-prop-types, because of false positive */
type Props = {
  courses: CoursesState,
  day: string,
  appointmentsOfDay: Array<Appointment>,
};
/* eslint-enable react/no-unused-prop-types */

function renderCoursesOfDay(props: Props) {
  const { courses, appointmentsOfDay } = props;
  return appointmentsOfDay.map(appointment => {
    const course = courses[appointment.course];
    if (!course) {
      throw new Error(
        `The course of appointment ${appointment.id} does not exist`,
      );
    }
    return (
      <CourseAppointment
        name={course.name}
        starttime={appointment.starttime}
        endtime={appointment.endtime}
        location={appointment.location}
        type={appointment.type}
        key={appointment.id}
      />
    );
  });
}

// exported for tests
export function TimetableDay(props: Props) {
  const { appointmentsOfDay, day } = props;
  if (appointmentsOfDay.length !== 0) {
    return <DayBorder date={day}>{renderCoursesOfDay(props)}</DayBorder>;
  }
  return null;
}

function mapStateToProps(state) {
  return {
    courses: state.courses,
  };
}

export default connect(mapStateToProps)(TimetableDay);
