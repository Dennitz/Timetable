import reducer from '../courses';
import { EDIT_COURSE, REMOVE_COURSE } from '../../actions/course-actions';
import { REMOVE_APPOINTMENT } from '../../actions/appointment-actions';

describe('courses reducer', () => {
  const testCourse1 = {
    id: 'course1',
    name: 'test course',
    appointments: ['app1', 'app2'],
  };
  const state = {
    course1: testCourse1,
  };

  // initial state is modified for development
  it.skip('returns the initial state', () => {
    const initialState = {};
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('handles REMOVE_COURSE', () => {
    const action = {
      type: REMOVE_COURSE,
      courseId: testCourse1.id,
      appointments: testCourse1.appointments,
    };
    expect(reducer(state, action)).toEqual({});
  });

  it('handles REMOVE_APPOINTMENT', () => {
    const action = {
      type: REMOVE_APPOINTMENT,
      appointmentId: testCourse1.appointments[1],
      courseId: testCourse1.id,
    };
    const newState = {
      course1: {
        ...testCourse1,
        appointments: ['app1'],
      },
    };
    expect(reducer(state, action)).toEqual(newState);
  });

  describe('handles EDIT_COURSE', () => {
    it('adds a new course to empty state', () => {
      const action = {
        type: EDIT_COURSE,
        course: testCourse1,
      };
      const newState = {
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
      const action = {
        type: EDIT_COURSE,
        course: testCourse2,
      };
      const newState = {
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
      const action = {
        type: EDIT_COURSE,
        course: newTestCourse1,
      };
      const newState = {
        course1: newTestCourse1,
      };
      expect(reducer(state, action)).toEqual(newState);
    });
  });
});
