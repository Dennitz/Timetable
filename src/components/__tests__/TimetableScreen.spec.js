// @flow
import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import { WEEKLY } from '../../lib/recurrence';
import { MON, TUE } from '../../lib/weekdays';
import { TimetableScreen } from '../TimetableScreen';

const startdate = moment('01-01-2017', 'MM-DD-YYYY').day(0); // sunday
const enddate = startdate.add(3, 'weeks');
const appointment1 = {
  id: 'app1',
  day: MON,
  startdate,
  enddate,
  starttime: new Date(1),
  endtime: new Date(2),
  course: 'course1',
  recurrence: WEEKLY,
};
const appointment2 = {
  ...appointment1,
  id: 'app2',
  day: TUE,
};
const appointment3 = {
  ...appointment1,
  id: 'app3',
};
const appointmentsPerDay = [
  [appointment1, appointment3],
  [appointment2],
];

describe('Not connected TimetableScreen', () => {
  let wrapper;
  let props;
  beforeEach(() => {
    props = {
      appointmentsPerDay,
      dispatch: jest.fn(),
      currentWeek: startdate.clone().startOf('week'),
      navigation: {
        navigate: jest.fn(),
      },
    };
    wrapper = shallow(<TimetableScreen {...props} />);
  });

  it('renders a TimetableDay for each element of appointmentsPerDay', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('passes an onEditCourse function to TimetableDay which takes a courseId '
    + 'and navigates to CourseForm passing the courseId', () => {
    wrapper.find({
      appointmentsOfDay: appointmentsPerDay[0],
    }).simulate('editCourse', 'a courseId');

    const { navigate } = props.navigation;
    expect(navigate.mock.calls.length).toBe(1);
    expect(navigate.mock.calls[0][0]).toBe('CourseForm');
    expect(navigate.mock.calls[0][1]).toEqual({ courseId: 'a courseId' });
  });
});
