// @flow
import React from 'react';
import { shallow } from 'enzyme';
import { destroy } from 'redux-form';
import moment from 'moment';
import mockdate from 'mockdate';

import { editAppointment } from '../../actions/appointment-actions';
import { editCourse, removeCourse } from '../../actions/course-actions';
import { WEEKLY } from '../../lib/recurrence';
import { SUN, MON } from '../../lib/weekdays';
import { CourseFormScreen } from '../CourseFormScreen';

mockdate.set(moment('01-01-2017', 'MM-DD-YYYY').startOf('day')); // sunday

jest.mock('uuid/v1', () =>
  () => 'a unique id',
);

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
    starttime: new Date(1),
    endtime: new Date(2),
    day: SUN,
    recurrence: WEEKLY,
  },
  app2: {
    id: 'app2',
    course: 'course2',
    startdate: moment().add(1, 'day'),
    enddate: moment().add(1, 'day').add(3, 'weeks'),
    starttime: new Date(1),
    endtime: new Date(2),
    day: MON,
    recurrence: WEEKLY,
  },
};

const sharedProps = {
  dispatch: jest.fn(),
  navigation: {
    state: {
      params: {},
    },
    setParams: jest.fn(),
    goBack: jest.fn(),
  },
  courses,
  appointments,
};

const formInput = {
  name: 'test name',
  appointments: [
    {
      dates: {
        start: moment(),
        end: moment().add(3, 'weeks'),
      },
      starttime: new Date(1),
      endtime: new Date(2),
      day: MON,
      recurrence: WEEKLY,
    },
  ],
};

describe('Not connected CourseFormScreen', () => {
  describe('when no courseId is passed in on navigation', () => {
    const props = {
      ...sharedProps,
      navigation: {
        ...sharedProps.navigation,
        state: {
          params: {
            courseId: undefined,
          },
        },
      },
    };

    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<CourseFormScreen {...props} />);
    });
    afterEach(() => {
      jest.resetAllMocks();
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
        .toBeCalledWith(editCourse('a unique id', formInput.name, ['a unique id']));
      expect(props.dispatch)
        .toBeCalledWith(editAppointment(
          formInput.appointments[0], 'a unique id', 'a unique id'));
      expect(props.dispatch);
      expect(props.navigation.goBack).toBeCalled();
    });
  });

  describe('when a courseId is passed in on navigation', () => {
    const props = {
      ...sharedProps,
      navigation: {
        ...sharedProps.navigation,
        state: {
          params: {
            courseId: 'course1',
          },
        },
      },
    };

    let wrapper;
    beforeEach(() => {
      jest.resetAllMocks();
      wrapper = shallow(<CourseFormScreen {...props} />);
    });

    const passedInAppointment = {
      starttime: appointments.app1.starttime,
      endtime: appointments.app1.endtime,
      day: appointments.app1.day,
      recurrence: appointments.app1.recurrence,
      dates: {
        start: appointments.app1.startdate,
        end: appointments.app1.enddate,
      },
    };

    it('renders a CourseForm with correct initialValues and with a removeButton', () => {
      const connectedCourseForm = wrapper.find({
        initialValues: {
          name: 'A course',
          appointments: [passedInAppointment],
        },
        hasRemoveButton: true,
      });
      expect(connectedCourseForm.length).toBe(1);
    });

    it('dispatches correct actions and navigates back on submit', () => {
      const courseForm = wrapper.find({ initialValues: {} });
      courseForm.simulate('submit', formInput);

      const course = courses.course1;
      expect(props.dispatch)
        .toBeCalledWith(editCourse(course.id, formInput.name, ['a unique id']));
      expect(props.dispatch)
        .toBeCalledWith(editAppointment(
          passedInAppointment, 'a unique id', course.id));
      expect(props.dispatch)
        .toBeCalledWith(editAppointment(
          formInput.appointments[0], 'a unique id', course.id));
      expect(props.dispatch);
      expect(props.navigation.goBack).toBeCalled();
    });

    it('dispatches correct actions and navigates back on removeCourse', () => {
      const courseForm = wrapper.find({ initialValues: {} });
      courseForm.simulate('removeCourse');

      const course = courses.course1;
      expect(props.dispatch)
        .toBeCalledWith(removeCourse(course.id, course.appointments));
      expect(props.dispatch);
      expect(props.navigation.goBack).toBeCalled();
    });
  });
});
