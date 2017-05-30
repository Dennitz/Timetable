// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import moment from 'moment';
import { WEEKLY } from '../../lib/recurrence';
import { MON } from '../../lib/weekdays';
import { TimetableDay } from '../TimetableDay';

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
const startdate = moment('01-01-2017', 'MM-DD-YYYY').day(0); // sunday
const enddate = startdate.add(3, 'weeks');
const appointmentsOfDay: Array<Appointment> = [
  {
    id: 'app1',
    course: 'course1',
    startdate,
    enddate,
    starttime: new Date(1),
    endtime: new Date(2),
    day: MON,
    recurrence: WEEKLY,
  },
  {
    id: 'app2',
    course: 'course2',
    startdate,
    enddate,
    starttime: new Date(1),
    endtime: new Date(2),
    day: MON,
    recurrence: WEEKLY,
  },
];

const props = {
  courses,
  day: 'mon',
  appointmentsOfDay,
  onEditCourse: jest.fn(),
};

describe('TimetableDay', () => {
  it('renders a CourseAppointment for each element of prop appointmentsOfDay', () => {
    const tree = renderer.create(<TimetableDay {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('calls props.onEditCourse(course.id) when CourseAppointment calls onEdit', () => {
    const wrapper = shallow(<TimetableDay {...props} />);
    const course = courses.course1;
    wrapper.find({ name: course.name }).simulate('edit');
    expect(props.onEditCourse).toBeCalledWith(course.id);
  });
});
