// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import moment from 'moment';
import CourseAppointment from '../CourseAppointment';

const fixedMoment = moment('01-01-2017', 'MM-DD-YYYY').startOf('day');

const props = {
  name: 'CourseAppointment name',
  starttime: fixedMoment,
  endtime: fixedMoment.clone().add(1, 'hour'),
  onEdit: jest.fn(),
};

describe('CourseAppointment component', () => {
  it('renders correctly without optional props', () => {
    const tree = renderer.create(<CourseAppointment {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with optional props', () => {
    const tree = renderer.create(
      <CourseAppointment {...props} location="Test location" type="Lecture" />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
