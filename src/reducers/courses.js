// @flow
import * as R from 'ramda';
import { createSelector } from 'reselect';

import { EDIT_COURSE, REMOVE_COURSE } from '../actions/course-actions';
import { REMOVE_APPOINTMENTS } from '../actions/appointment-actions';

const INITIAL_STATE = {};

export default function reducer(
  state: CoursesState = INITIAL_STATE,
  action: Action,
) {
  switch (action.type) {
    case EDIT_COURSE:
      return {
        ...state,
        [action.course.id]: action.course,
      };
    case REMOVE_COURSE:
      return R.dissoc(action.courseId, state);
    case REMOVE_APPOINTMENTS:
      return R.evolve(
        {
          [action.courseId]: {
            appointments: R.without(action.appointmentIds),
          },
        },
        state,
      );
    default:
      return state;
  }
}

export const getCoursesSortedByName: (
  state: ApplicationState,
) => Array<Course> = createSelector(
  [state => state.courses],
  (courses: CoursesState) =>
    R.values(courses).sort((a, b) => a.name.localeCompare(b.name)),
);
