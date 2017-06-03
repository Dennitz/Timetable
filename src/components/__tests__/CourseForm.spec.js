// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import
CourseForm, {
  RemoveCourseButton,
} from '../CourseForm';

describe('CourseForm', () => {
  const props = {
    error: undefined,
    navigateToAppointmentForm: () => { },
    onRemoveCourse: () => { },
    hasRemoveButton: false,
    onSubmit: () => { },
  };

  it('renders correctly when hasRemoveButton is false', () => {
    const wrapper = shallow(<CourseForm {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly when hasRemoveButton is true', () => {
    const otherProps = {
      ...props,
      hasRemoveButton: true,
    };
    const wrapper = shallow(<CourseForm {...otherProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders errors correctly', () => {
    const otherProps = {
      ...props,
      error: 'an error message',
    };
    const wrapper = shallow(<CourseForm {...otherProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('RemoveCourseButton', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<RemoveCourseButton onPress={() => { }} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
