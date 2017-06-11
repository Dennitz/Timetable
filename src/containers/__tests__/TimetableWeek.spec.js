// @flow
import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import { WEEKLY } from '../../lib/recurrence';
import { TimetableWeek } from '../TimetableWeek';

const fixedMoment = moment('01-01-2017', 'MM-DD-YYYY').startOf('day');
const appointment1: Appointment = {
  id: 'app1',
  startdate: fixedMoment,
  enddate: fixedMoment.clone().add(1, 'month'),
  starttime: fixedMoment,
  endtime: fixedMoment.clone().add(2, 'hours'),
  course: 'course1',
  recurrence: WEEKLY,
};
const appointment2: Appointment = {
  ...appointment1,
  id: 'app2',
  startdate: fixedMoment.clone().add(1, 'day'),
};
const appointment3: Appointment = {
  ...appointment1,
  id: 'app3',
  starttime: fixedMoment.clone().add(1, 'hours'),
};
const appointmentsPerDay = [
  [appointment1, appointment3],
  [appointment2],
];

const props = {
  shouldCloseLaunchScreen: false,
  week: fixedMoment.startOf('week'),
  appointmentsPerDay,
};

describe('TimetableScreen', () => {
  it('renders correctly', () => {
    const wrapper = shallow(
      <TimetableWeek {...props} />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
