// @flow
import * as actions from '../course-actions';

const COURSE_ID = 'course1';
const APPOINTMENT_IDS = ['appointment1, appointment2'];

describe('course action creators', () => {
  it("creates an action to remove a course with all it's appointments", () => {
    const expectedAction = {
      type: actions.REMOVE_COURSE,
      courseId: COURSE_ID,
      appointmentIds: APPOINTMENT_IDS,
    };
    expect(actions.removeCourse(COURSE_ID, APPOINTMENT_IDS)).toEqual(expectedAction);
  });

  it('creates an action to add or edit a course', () => {
    const expectedAction = {
      type: actions.EDIT_COURSE,
      course: {
        id: COURSE_ID,
        name: 'test name',
        appointments: APPOINTMENT_IDS,
      },
    };
    expect(actions.editCourse(COURSE_ID, 'test name', APPOINTMENT_IDS)).toEqual(expectedAction);
  });
});
