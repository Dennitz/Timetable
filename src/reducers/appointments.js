// @flow
import * as R from 'ramda';
import Moment from 'moment';
import {
  createSelector,
  createSelectorCreator,
  defaultMemoize,
} from 'reselect';
import { extendMoment } from 'moment-range';

import {
  ADD_APPOINTMENTS,
  REMOVE_APPOINTMENTS,
} from '../actions/appointment-actions';
import { REMOVE_COURSE } from '../actions/course-actions';
import { WEEKLY, BIWEEKLY } from '../lib/recurrence';

const moment = extendMoment(Moment);

export type AppointmentsPerDay = Array<Array<Appointment>>;

const INITITAL_STATE = {};

export default function reducer(
  state: AppointmentsState = INITITAL_STATE,
  action: Action,
) {
  switch (action.type) {
    case ADD_APPOINTMENTS:
      return {
        ...state,
        ...action.appointments,
      };
    case REMOVE_APPOINTMENTS:
      return R.omit(action.appointmentIds, state);
    case REMOVE_COURSE:
      return R.omit(action.appointmentIds, state); // removes all appointments of the removed course
    default:
      return state;
  }
}

/**
 * Checks if the given appointment takes places in the given week.
 */
function isAppointmentOfWeek(appointment: Appointment, weekStart: moment) {
  const { startdate, enddate, recurrence } = appointment;

  const dayOfAppoinment = startdate.weekday();
  const appointmentRecursThisWeek =
    recurrence === WEEKLY ||
    (recurrence === BIWEEKLY &&
      weekStart
        .clone()
        .weekday(dayOfAppoinment)
        .diff(startdate, 'weeks') %
        2 ===
        0);

  const currentWeekRange = weekStart.clone().range('week');
  const appointmentRange = moment.range(startdate, enddate);

  return (
    currentWeekRange.overlaps(appointmentRange) && appointmentRecursThisWeek
  );
}

/**
 * year, month and day of appointment.starttime and appointment.endtime may be dependent
 * on date of creation, so for comparison they need to be set to the same.
 */
function getTimeOnFixedDate(time: moment$Moment) {
  return time
    .clone()
    .year(2000)
    .month(1)
    .day(1);
}

function findFirstIndexLaterStart(
  appointmentArray: Array<Appointment>,
  appointmentToInsert: Appointment,
) {
  return appointmentArray.findIndex(appointment => {
    const currentStartTime = getTimeOnFixedDate(appointment.starttime);
    const toInsertStartTime = getTimeOnFixedDate(appointmentToInsert.starttime);
    // $FlowFixMe, this function does accept two arguments!
    if (currentStartTime.isSame(toInsertStartTime, 'minutes')) {
      const currentEndTime = getTimeOnFixedDate(appointment.endtime);
      const toInsertEndTime = getTimeOnFixedDate(appointmentToInsert.endtime);
      // $FlowFixMe
      return currentEndTime.isAfter(toInsertEndTime, 'minutes');
    }
    // $FlowFixMe
    return currentStartTime.isAfter(toInsertStartTime, 'minutes');
  });
}

function insertSortedByTime(
  appointmentArray: Array<Appointment>,
  appointmentToInsert: Appointment,
) {
  const insertIndex = findFirstIndexLaterStart(
    appointmentArray,
    appointmentToInsert,
  );
  if (insertIndex === -1) {
    appointmentArray.push(appointmentToInsert);
  } else {
    appointmentArray.splice(insertIndex, 0, appointmentToInsert);
  }
}

/**
 * Each index of the returned array represents a day. The first day of a week according to
 * the device's locale will be a index 0.
 */
function mapAppointmentsToIndex(
  appointments: AppointmentsState,
  weekStart: moment$Moment,
) {
  const days = Array(7)
    .fill(null)
    .map(() => []);
  R.values(appointments).forEach(appointment => {
    const dayOfAppoinment = appointment.startdate.weekday();
    if (isAppointmentOfWeek(appointment, weekStart)) {
      insertSortedByTime(days[dayOfAppoinment], appointment);
    }
  });
  return days;
}

/**
 * Used for custom equality check
 */
const createMomentSelector = createSelectorCreator(
  defaultMemoize,
  (a: moment, b: moment) => a.isSame(b, 'day'),
);
const momentSelector = createMomentSelector(
  [(state, week: moment) => week],
  (week: moment) => week,
);

export function makeGetSortedAppointmentsPerDay() {
  const getSortedAppointmentsPerDay: (
    state: ApplicationState,
    weekStart: moment$Moment,
  ) => AppointmentsPerDay = createSelector(
    [state => state.appointments, momentSelector],
    mapAppointmentsToIndex,
  );
  return getSortedAppointmentsPerDay;
}
