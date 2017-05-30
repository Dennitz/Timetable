// @flow
export const REMOVE_COURSE = 'REMOVE_COURSE';
export const EDIT_COURSE = 'EDIT_COURSE'; // also adds a new course

export function editCourse(
  name: string,
  courseId: string,
  appointmentIds: Array<string>,
): Action {
  return {
    type: EDIT_COURSE,
    course: {
      id: courseId,
      appointments: appointmentIds,
      name,
    },
  };
}

export function removeCourse(
  courseId: string,
  appointmentIds: Array<string>,
): Action {
  return {
    type: REMOVE_COURSE,
    courseId,
    appointmentIds,
  };
}
