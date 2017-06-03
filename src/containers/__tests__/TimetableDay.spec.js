// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import moment from 'moment';
import mockdate from 'mockdate';
import { WEEKLY } from '../../lib/recurrence';
import { TimetableDay } from '../TimetableDay';

mockdate.set(moment('01-01-2017', 'MM-DD-YYYY').startOf('day'));

const courses: CoursesState = {
  course1: {
    id: 'course1',
    name: 'A course',
    appointments: ['app1'],
  },
  course2: {
    id: 'course2',
    name: 'Another course',
    appointments: ['app2'],
  },
};

const appointmentsOfDay: Array<Appointment> = [
  {
    id: 'app1',
    course: 'course1',
    startdate: moment(),
    enddate: moment().add(3, 'weeks'),
    starttime: moment(),
    endtime: moment().add(1, 'hour'),
    recurrence: WEEKLY,
  },
  {
    id: 'app2',
    course: 'course2',
    startdate: moment().add(1, 'day'),
    enddate: moment().add(3, 'weeks'),
    starttime: moment().add(1, 'hour'),
    endtime: moment().add(2, 'hour'),
    recurrence: WEEKLY,
  },
];

const props = {
  courses,
  day: 'mon',
  appointmentsOfDay,
};

describe('TimetableDay', () => {
  it('renders a CourseAppointment for each element of props.appointmentsOfDay', () => {
    const tree = renderer.create(<TimetableDay {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
