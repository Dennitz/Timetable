// @flow
import moment from 'moment';
import mockdate from 'mockdate';
import reducer, { makeGetSortedAppointmentsPerDay } from '../appointments';
import { ADD_APPOINTMENTS, REMOVE_APPOINTMENTS } from '../../actions/appointment-actions';
import { REMOVE_COURSE } from '../../actions/course-actions';
import { WEEKLY, BIWEEKLY } from '../../lib/recurrence';

mockdate.set(moment('01-01-2017', 'MM-DD-YYYY').startOf('day'));

// app1 to app3 take place in same week as moment(), app4 does not
const appointments: AppointmentsState = {
  app1: {
    id: 'app1',
    course: 'course1',
    startdate: moment(),
    enddate: moment().add(3, 'weeks'),
    starttime: moment(),
    endtime: moment().add(1, 'hour'),
    recurrence: WEEKLY,
  },
  app2: {
    id: 'app2',
    course: 'course1',
    startdate: moment(),
    enddate: moment().add(3, 'weeks'),
    starttime: moment().add(1, 'hour'),
    endtime: moment().add(2, 'hour'),
    recurrence: WEEKLY,
  },
  app3: {
    id: 'app3',
    course: 'course2',
    startdate: moment().add(1, 'day'),
    enddate: moment().add(1, 'day').add(5, 'weeks'),
    starttime: moment(),
    endtime: moment().add(1, 'hour'),
    recurrence: BIWEEKLY,
  },
  app4: {
    id: 'app4',
    course: 'course2',
    startdate: moment().add(1, 'day').subtract(1, 'week'),
    enddate: moment().add(1, 'day').add(5, 'weeks'),
    starttime: moment(),
    endtime: moment().add(1, 'hour'),
    recurrence: BIWEEKLY,
  },
};

describe('appointments reducer', () => {
  const { app1, app2, app3, app4 } = appointments;
  const state: AppointmentsState = { app1 };

  it('returns the initial state', () => {
    const initialState = {};
    // $FlowFixMe
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('handles REMOVE_APPOINTMENTS', () => {
    const action: RemoveAppointmentsAction = {
      type: REMOVE_APPOINTMENTS,
      courseId: app1.course,
      appointmentIds: [app1.id],
    };
    expect(reducer(state, action)).toEqual({});
  });

  it('handles REMOVE_COURSE', () => {
    const action: RemoveCourseAction = {
      type: REMOVE_COURSE,
      courseId: app1.course,
      appointmentIds: [app1.id, app2.id],
    };
    expect(reducer(appointments, action)).toEqual({ app3, app4 });
  });

  describe('handles ADD_APPOINTMENTS', () => {
    it('adds a new appointment to empty state', () => {
      const action: AddAppointmentsAction = {
        type: ADD_APPOINTMENTS,
        appointments: {
          [app1.id]: app1,
        },
      };
      const newState: AppointmentsState = action.appointments;
      expect(reducer({}, action)).toEqual(newState);
    });

    it('adds a new appointment to non empty state', () => {
      const action: AddAppointmentsAction = {
        type: ADD_APPOINTMENTS,
        appointments: {
          [app2.id]: app2,
        },
      };
      const newState: AppointmentsState = {
        [app1.id]: app1,
        [app2.id]: app2,
      };
      expect(reducer(state, action)).toEqual(newState);
    });
  });
});

describe('appointment selectors', () => {
  const state: ApplicationState = {
    appointments,
    courses: {},
    form: {},
  };

  describe('makeGetVisibleAppointmentsPerDay', () => {
    const getVisibleAppointmentsPerDay = makeGetSortedAppointmentsPerDay();

    beforeEach(() => {
      // decouple tests from each other
      getVisibleAppointmentsPerDay({ appointments: {}, courses: {}, form: {} }, moment());
      getVisibleAppointmentsPerDay.resetRecomputations();
    });

    it('returns a map with appointments taking place in the passed in week ' +
      'mapped to their index corresponding to the current locale', () => {
      const expected = [
        [state.appointments.app1, state.appointments.app2],
        [state.appointments.app3],
        [],
        [],
        [],
        [],
        [],
      ];
      expect(getVisibleAppointmentsPerDay(state, moment())).toEqual(expected);
    });

    it('memoizes the selection and does not recalculate if passed in state and moment did not change', () => {
      getVisibleAppointmentsPerDay(state, moment());
      getVisibleAppointmentsPerDay(state, moment());
      expect(getVisibleAppointmentsPerDay.recomputations()).toEqual(1);
    });

    it('recalculates if passed in moment changed', () => {
      getVisibleAppointmentsPerDay(state, moment());
      getVisibleAppointmentsPerDay(state, moment().add(1, 'week'));
      expect(getVisibleAppointmentsPerDay.recomputations()).toEqual(2);
    });

    it('recalculates if passed in state changed', () => {
      const newState = {
        ...state,
        appointments: {
          ...state.appointments,
          app5: {
            ...state.appointments.app1,
            id: 'app5',
            course: 'course1',
          },
        },
      };
      getVisibleAppointmentsPerDay(state, moment());
      getVisibleAppointmentsPerDay(newState, moment());
      expect(getVisibleAppointmentsPerDay.recomputations()).toEqual(2);
    });
  });
});
