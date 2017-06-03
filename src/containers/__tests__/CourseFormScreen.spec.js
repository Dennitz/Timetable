// @flow
import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import mockdate from 'mockdate';
import { addAppointments, removeAppointments } from '../../actions/appointment-actions';
import { editCourse, removeCourse } from '../../actions/course-actions';
import { WEEKLY } from '../../lib/recurrence';
import navigatorMock from '../../lib/navigatorMock';
import { CourseFormScreen } from '../CourseFormScreen';
import type { CourseFormInput } from '../CourseFormScreen';

mockdate.set(moment('01-01-2017', 'MM-DD-YYYY').startOf('day'));

jest.mock('uuid/v1', () =>
  () => 'UUID_RETURN_VALUE',
);
const UUID_RETURN_VALUE = 'UUID_RETURN_VALUE';

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

const appointments: AppointmentsState = {
  app1: {
    id: 'app1',
    course: 'course1',
    startdate: moment(),
    enddate: moment().add(3, 'weeks'),
    starttime: moment(),
    endtime: moment().add(1, 'hour'),
    recurrence: WEEKLY,
  },
  app2: {
    id: 'app2',
    course: 'course2',
    startdate: moment().add(1, 'day'),
    enddate: moment().add(3, 'weeks'),
    starttime: moment().add(1, 'hour'),
    endtime: moment().add(2, 'hour'),
    recurrence: WEEKLY,
  },
};

const sharedProps = {
  appointments,
  appointmentFieldArray: [],
  courses,
  dispatch: jest.fn(),
  navigator: navigatorMock,
};

const formInput: CourseFormInput = {
  name: 'test name',
  appointments: [
    {
      ...appointments.app1,
      startdate: moment().add(2, 'days'),
      id: undefined,
    },
  ],
};

describe('Not connected CourseFormScreen', () => {
  describe('when no courseId is passed in on navigation', () => {
    const props = sharedProps;
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<CourseFormScreen {...props} />);
    });

    it('renders a CourseForm with empty initialValues and without a removeButton', () => {
      const connectedCourseForm = wrapper.find({
        initialValues: {},
        hasRemoveButton: false,
      });
      expect(connectedCourseForm.length).toBe(1);
    });

    it('dispatches correct actions and navigates back on submit', () => {
      const courseForm = wrapper.find({ initialValues: {} });
      courseForm.simulate('submit', formInput);

      expect(props.dispatch)
        .toBeCalledWith(editCourse(formInput.name, UUID_RETURN_VALUE, [UUID_RETURN_VALUE]));
      expect(props.dispatch)
        .toBeCalledWith(addAppointments({
          UUID_RETURN_VALUE: {
            ...formInput.appointments[0],
            id: UUID_RETURN_VALUE,
            course: UUID_RETURN_VALUE,
          },
        }));
      expect(props.navigator.dismissModal).toBeCalled();
    });
  });

  /**
   * An appointment is present before submitting because the passed in course
   * already had an appointment in state (course1, app1)
   */
  describe('when a courseId is passed in on navigation', () => {
    const props = {
      ...sharedProps,
      courseId: courses.course1.id,
    };
    const previousAppointment = {
      ...appointments.app1,
      id: undefined,
      course: undefined,
    };

    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<CourseFormScreen {...props} />);
    });

    it('renders a CourseForm with correct initialValues and with a removeButton', () => {
      const connectedCourseForm = wrapper.find({
        initialValues: {
          name: 'A course',
          appointments: [previousAppointment],
        },
        hasRemoveButton: true,
      });
      expect(connectedCourseForm.length).toBe(1);
    });

    it('dispatches correct actions and navigates back on submit', () => {
      const courseForm = wrapper.find({ initialValues: {} });
      courseForm.simulate('submit', formInput);

      const course = courses.course1;

      // remove old appointments of course
      expect(props.dispatch)
        .toBeCalledWith(removeAppointments(course.appointments, course.id));

      // edit course information
      expect(props.dispatch)
        .toBeCalledWith(editCourse(formInput.name, course.id, [UUID_RETURN_VALUE]));

      // add new appointments
      // (maybe old ones again - if they were passed in again (not in this test))
      expect(props.dispatch)
        .toBeCalledWith(addAppointments({
          UUID_RETURN_VALUE: {
            ...formInput.appointments[0],
            id: UUID_RETURN_VALUE,
            course: course.id,
          },
        }));

      expect(props.navigator.pop).toBeCalled();
    });

    it('dispatches correct actions and navigates back on removeCourse', () => {
      const courseForm = wrapper.find({ initialValues: {} });
      courseForm.simulate('removeCourse');

      const course = courses.course1;
      expect(props.dispatch)
        .toBeCalledWith(removeCourse(course.id, course.appointments));
      expect(props.navigator.pop).toBeCalled();
    });
  });
});
