// @flow
import reducer from '../courses';
import { EDIT_COURSE, REMOVE_COURSE } from '../../actions/course-actions';
import { REMOVE_APPOINTMENTS } from '../../actions/appointment-actions';

describe('courses reducer', () => {
  const testCourse1: Course = {
    id: 'course1',
    name: 'test course',
    appointments: ['app1', 'app2'],
  };
  const state: CoursesState = {
    course1: testCourse1,
  };

  it('returns the initial state', () => {
    const initialState = {};
    // $FlowFixMe
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('handles REMOVE_COURSE', () => {
    const action: RemoveCourseAction = {
      type: REMOVE_COURSE,
      courseId: testCourse1.id,
      appointmentIds: testCourse1.appointments,
    };
    expect(reducer(state, action)).toEqual({});
  });

  it('handles REMOVE_APPOINTMENTS', () => {
    const action: RemoveAppointmentsAction = {
      type: REMOVE_APPOINTMENTS,
      appointmentIds: [testCourse1.appointments[0]],
      courseId: testCourse1.id,
    };
    const newState: CoursesState = {
      course1: {
        ...testCourse1,
        appointments: [testCourse1.appointments[1]],
      },
    };
    expect(reducer(state, action)).toEqual(newState);
  });

  describe('handles EDIT_COURSE', () => {
    it('adds a new course to empty state', () => {
      const action: EditCourseAction = {
        type: EDIT_COURSE,
        course: testCourse1,
      };
      const newState: CoursesState = {
        course1: testCourse1,
      };
      expect(reducer({}, action)).toEqual(newState);
    });

    it('adds a new course to non empty state', () => {
      const testCourse2 = {
        id: 'course2',
        name: 'another course',
        appointments: ['app1', 'app2'],
      };
      const action: EditCourseAction = {
        type: EDIT_COURSE,
        course: testCourse2,
      };
      const newState: CoursesState = {
        ...state,
        course2: testCourse2,
      };
      expect(reducer(state, action)).toEqual(newState);
    });

    it('edits an existing course', () => {
      const newTestCourse1 = {
        ...testCourse1,
        name: 'another name',
      };
      const action: EditCourseAction = {
        type: EDIT_COURSE,
        course: newTestCourse1,
      };
      const newState: CoursesState = {
        course1: newTestCourse1,
      };
      expect(reducer(state, action)).toEqual(newState);
    });
  });
});
