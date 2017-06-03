// @flow
import {
  editCourse,
  removeCourse,
  EDIT_COURSE,
  REMOVE_COURSE,
} from '../course-actions';

const COURSE_ID = 'course1';
const APPOINTMENT_IDS = ['appointment1, appointment2'];

describe('course action creators', () => {
  it("removeCourse creates an action to remove a course with all it's appointments", () => {
    const expectedAction = {
      type: REMOVE_COURSE,
      courseId: COURSE_ID,
      appointmentIds: APPOINTMENT_IDS,
    };
    expect(removeCourse(COURSE_ID, APPOINTMENT_IDS)).toEqual(expectedAction);
  });

  test('editAppointments returns an action to add or edit a course', () => {
    const name = 'test name';
    const expectedAction = {
      type: EDIT_COURSE,
      course: {
        id: COURSE_ID,
        appointments: APPOINTMENT_IDS,
        name,
      },
    };
    expect(editCourse(name, COURSE_ID, APPOINTMENT_IDS)).toEqual(expectedAction);
  });
});
