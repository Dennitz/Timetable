// @flow
import { AsyncStorage } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { createStore, applyMiddleware } from 'redux';
import * as R from 'ramda';
import moment from 'moment';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
// $FlowFixMe redux-persist does have autoRehydrate as named export
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
    applyMiddleware(thunk),
    autoRehydrate(),
  ),
);

function recursiveToDate(value) {
  if (R.is(Object, value) && !R.is(String, value)) {
    return R.map(recursiveToDate, value);
  }
  if (moment(value, moment.ISO_8601, true).isValid()) {
    return moment(value);
  }
  return value;
}

// $FlowFixMe third parameter of createTransform is optional
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

