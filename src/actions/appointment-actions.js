// @flow
export const REMOVE_APPOINTMENTS = 'REMOVE_APPOINTMENTS';
export const ADD_APPOINTMENTS = 'ADD_APPOINTMENTS';

/**
 * Add multiple appointments
 */
export function addAppointments(appointments: AppointmentsState): AddAppointmentsAction {
  return {
    type: ADD_APPOINTMENTS,
    appointments,
  };
}

/**
 * Remove multiple appointments of a single course
 */
export function removeAppointments(
  appointmentIds: Array<string>,
  courseId: string,
): RemoveAppointmentsAction {
  return {
    type: REMOVE_APPOINTMENTS,
    appointmentIds,
    courseId,
  };
}
