// @flow
import moment from 'moment';
import { WEEKLY } from '../../lib/recurrence';
import { SUN } from '../../lib/weekdays';
import * as actions from '../appointment-actions';

describe('appointment action creators', () => {
  it('creates an action to add or edit an appointment', () => {
    const startdate = moment('01-01-2017', 'MM-DD-YYYY').day(0); // sunday
    const enddate = startdate.add(3, 'weeks');
    const appointment: AppointmentInput = {
      dates: {
        start: startdate,
        end: enddate,
      },
      starttime: new Date(1),
      endtime: new Date(2),
      recurrence: WEEKLY,
      location: 'location',
      type: 'lecture',
    };
    const appointmentId = 'appointment1';
    const courseId = 'course1';
    const expectedAction = {
      type: actions.EDIT_APPOINTMENT,
      appointment: {
        id: appointmentId,
        course: courseId,
        startdate,
        enddate,
        day: SUN,
        starttime: new Date(1),
        endtime: new Date(2),
        recurrence: WEEKLY,
        location: 'location',
        type: 'lecture',
      },
    };
    expect(actions.editAppointment(appointment, appointmentId, courseId)).toEqual(expectedAction);
  });

  it('creates an action to remove an appointment', () => {
    const appointmentId = 'appointment1';
    const courseId = 'course1';
    const expectedAction = {
      type: actions.REMOVE_APPOINTMENT,
      appointmentId,
      courseId,
    };
    expect(actions.removeAppointment(appointmentId, courseId)).toEqual(expectedAction);
  });
});
