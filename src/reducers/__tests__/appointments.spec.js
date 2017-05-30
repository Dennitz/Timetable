import moment from 'moment';
import mockdate from 'mockdate';
import reducer, { getVisibleAppointmentsPerDay } from '../appointments';
import { EDIT_APPOINTMENT, REMOVE_APPOINTMENT } from '../../actions/appointment-actions';
import { REMOVE_COURSE } from '../../actions/course-actions';
import { SUN, MON } from '../../lib/weekdays';
import { WEEKLY, BIWEEKLY } from '../../lib/recurrence';

mockdate.set(moment('01-01-2017', 'MM-DD-YYYY').startOf('day')); // sunday

describe('appointments reducer', () => {
  // other appointment properties omited for brevity
  const app1 = {
    id: 'appointment1',
    course: 'course1',
    location: 'test location',
  };
  const state = {
    appointment1: app1,
  };

  // initial state is modified for development
  it.skip('returns the initial state', () => {
    const initialState = {};
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('handles REMOVE_APPOINTMENT', () => {
    const action = {
      type: REMOVE_APPOINTMENT,
      courseId: 'course1',
      appointmentId: 'appointment1',
    };
    expect(reducer(state, action)).toEqual({});
  });

  it('handles REMOVE_COURSE', () => {
    const action = {
      type: REMOVE_COURSE,
      courseId: 'course1',
      appointmentIds: ['appointment1', 'appointment2'],
    };
    expect(reducer({ appointment1: {}, appointment2: {} }, action)).toEqual({});
  });

  describe('handles EDIT_APPOINTMENT', () => {
    it('adds a new appointment to empty state', () => {
      const action = {
        type: EDIT_APPOINTMENT,
        appointment: app1,
      };
      const newState = {
        appointment1: app1,
      };
      expect(reducer({}, action)).toEqual(newState);
    });

    it('adds a new appointment to non empty state', () => {
      const app2 = {
        ...app1,
        id: 'appointment2',
      };
      const action = {
        type: EDIT_APPOINTMENT,
        appointment: app2,
      };
      const newState = {
        appointment1: app1,
        appointment2: app2,
      };
      expect(reducer(state, action)).toEqual(newState);
    });

    it('edits an existing appointment', () => {
      const newApp1 = {
        ...app1,
        location: 'another location',
      };
      const action = {
        type: EDIT_APPOINTMENT,
        appointment: newApp1,
      };
      const newState = {
        appointment1: newApp1,
      };
      expect(reducer(state, action)).toEqual(newState);
    });
  });
});

describe('appointment selectors', () => {
  const state = {
    weekStart: moment().startOf('week'),
    appointments: {
      app1: {
        id: 'app1',
        day: SUN,
        startdate: moment(),
        enddate: moment().add(3, 'weeks'),
        recurrence: WEEKLY,
      },
      app2: {
        id: 'app2',
        day: SUN,
        startdate: moment(),
        enddate: moment().add(3, 'weeks'),
        recurrence: WEEKLY,
      },
      app3: {
        id: 'app3',
        day: MON,
        startdate: moment().add(1, 'day'),
        enddate: moment().add(1, 'day').add(5, 'weeks'),
        recurrence: BIWEEKLY,
      },
      app4: { // doesn't take place in current week
        id: 'app2',
        day: MON,
        startdate: moment().add(1, 'day').subtract(1, 'week'),
        enddate: moment().add(1, 'day').add(5, 'weeks'),
        recurrence: BIWEEKLY,
      },
    },
  };

  describe('getVisibleAppointmentsPerDay', () => {
    beforeEach(() => {
      // decouple tests from each other
      getVisibleAppointmentsPerDay({});
      getVisibleAppointmentsPerDay.resetRecomputations();
    });

    it('returns a map with appointments taking place in the current week (state.weekStart) '
      + 'mapped to their index corresponding to the current locale', () => {
      const expected = [
        [state.appointments.app1, state.appointments.app2],
        [state.appointments.app3],
        [],
        [],
        [],
        [],
        [],
      ];
      expect(getVisibleAppointmentsPerDay(state)).toEqual(expected);
    });

    it('memoizes the selection and recalculates if needed', () => {
      getVisibleAppointmentsPerDay(state);
      getVisibleAppointmentsPerDay(state);
      expect(getVisibleAppointmentsPerDay.recomputations()).toEqual(1);

      const newState = {
        ...state,
        appointments: {
          ...state.appointments,
          app4: {
            id: 'app4',
            day: MON,
            startdate: moment(),
            enddate: moment().add(5, 'weeks'),
          },
        },
      };
      getVisibleAppointmentsPerDay(newState);
      expect(getVisibleAppointmentsPerDay.recomputations()).toEqual(2);
    });
  });
});
