// @flow
import moment from 'moment';
import { WEEKLY } from '../../lib/recurrence';
import {
  addAppointments,
  removeAppointments,
  ADD_APPOINTMENTS,
  REMOVE_APPOINTMENTS,
} from '../appointment-actions';

const fixedMoment = moment('01-01-2017', 'MM-DD-YYYY').startOf('day');

const appointment1: Appointment = {
  id: 'app1',
  course: 'course1',
  startdate: fixedMoment,
  enddate: fixedMoment.clone().add(2, 'weeks'),
  starttime: fixedMoment,
  endtime: fixedMoment.clone().add(2, 'hours'),
  recurrence: WEEKLY,
};
const appointment2: Appointment = {
  ...appointment1,
  id: 'app2',
};

const appointments: AppointmentsState = {
  app1: appointment1,
  app2: appointment2,
};

describe('appointment action creators', () => {
  test('addAppointmens returns an ADD_APPOINTMENTS action to add multiple courses', () => {
    const expectedAction: AddAppointmentsAction = {
      type: ADD_APPOINTMENTS,
      appointments,
    };
    expect(addAppointments(appointments)).toEqual(expectedAction);
  });

  test('removeAppointments returns an REMOVE_APPOINTMENTS action ' +
    'to remove multiple appointments of a single course', () => {
    const appointmentIds = ['app1', 'app2', 'app3'];
    const courseId = 'course1';
    const expectedAction: RemoveAppointmentsAction = {
      type: REMOVE_APPOINTMENTS,
      appointmentIds,
      courseId,
    };
    expect(removeAppointments(appointmentIds, courseId)).toEqual(expectedAction);
  });
});
