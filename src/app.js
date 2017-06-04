// @flow
import { AsyncStorage } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { createStore } from 'redux';
import * as R from 'ramda';
import moment from 'moment';
import { Provider } from 'react-redux';
import { autoRehydrate, createTransform, persistStore } from 'redux-persist';
/* eslint-disable import/no-extraneous-dependencies */
import { composeWithDevTools } from 'remote-redux-devtools';
/* eslint-enable import/no-extraneous-dependencies */

import './i18n/I18n';
import rootReducer from './reducers';
import registerScreens, { TIMETABLE } from './screens';

const store = createStore(
  rootReducer,
  composeWithDevTools(
    autoRehydrate(),
  ),
);

/**
 * moments are stored as strings, so they must be converted back
 * to moments
 */
function recursiveToDate(value) {
  if (R.is(Object, value) && !R.is(String, value)) {
    return R.map(recursiveToDate, value);
  }
  if (moment(value, moment.ISO_8601, true).isValid()) {
    return moment(value);
  }
  return value;
}

const dateTransform = createTransform(values => values, R.map(recursiveToDate));

persistStore(store, {
  storage: AsyncStorage,
  blacklist: ['form'],
  transforms: [dateTransform],
});
registerScreens(store, Provider);

Navigation.startSingleScreenApp({
  screen: {
    screen: TIMETABLE,
  },
});

