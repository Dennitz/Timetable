// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import Course from '../CourseAppointment';

const starttime = new Date(2000, 1, 1, 10, 15);
const endtime = new Date(2000, 1, 1, 12, 15);

describe('Course component', () => {
  let props;
  beforeEach(() => {
    props = {
      name: 'course name',
      starttime,
      endtime,
      onEdit: jest.fn(),
    };
  });

  it('renders correctly without optional props', () => {
    const tree = renderer.create(<Course {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with optional props', () => {
    const tree = renderer.create(
      <Course {...props} location="Test location" type="Lecture" />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
