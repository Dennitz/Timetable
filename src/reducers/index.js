// @flow
import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import courses from './courses';
import appointments from './appointments';

const rootReducer = combineReducers({
  form,
  appointments,
  courses,
});

export default rootReducer;
