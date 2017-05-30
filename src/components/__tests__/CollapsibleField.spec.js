// @flow
import React from 'react';
import { Text, TouchableWithoutFeedback } from 'react-native';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Collapsible from 'react-native-collapsible';
import CollapsibleField from '../CollapsibleField';

const props = {
  headerText: 'header',
  placeholder: 'header placeholer',
  content: <Text>only visible if not collapsed</Text>,
  meta: {},
};

describe('CollapsibleField component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<CollapsibleField {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('initially is collapsed and toggles collapsed state when the header is pressed', () => {
    const wrapper = shallow(<CollapsibleField {...props} />);
    const button = wrapper.find(TouchableWithoutFeedback);

    expect(wrapper.find(Collapsible).prop('collapsed')).toBe(true);

    button.simulate('press');
    expect(wrapper.find(Collapsible).prop('collapsed')).toBe(false);

    button.simulate('press');
    expect(wrapper.find(Collapsible).prop('collapsed')).toBe(true);
  });
});
