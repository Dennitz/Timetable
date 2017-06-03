// @flow
import React from 'react';
import { Text, TouchableWithoutFeedback } from 'react-native';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import CollapsibleField from '../CollapsibleField';

const props = {
  headerText: 'header',
  meta: {},
  onExpand: jest.fn(),
  onCollapse: jest.fn(),
};
const childrenHeight = 20;
const children = (
  <Text stlye={{ height: childrenHeight }}>
    only visible if not collapsed
  </Text>
);

describe('CollapsibleField component', () => {
  it('renders correctly when collapsed and is initially collapsed', () => {
    const tree = renderer.create(
      <CollapsibleField {...props}>{children}</CollapsibleField>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it.skip('calls onExpand when expanding, onCollapse when collapsing', () => {
    const wrapper = shallow(
      <CollapsibleField {...props}>{children}</CollapsibleField>,
    );
    const button = wrapper.find(TouchableWithoutFeedback);

    button.simulate('press'); // should expand
    expect(props.onExpand).toHaveBeenCalled();

    button.simulate('press'); // should collapse
    expect(props.onCollapse).toHaveBeenCalled();
  });

  // it('initially is collapsed and toggles collapsed state when the header is pressed', () => {
  //   const wrapper = shallow(<CollapsibleField {...props} />);
  //   const button = wrapper.find(TouchableWithoutFeedback);

  //   expect(wrapper.find(Collapsible).prop('collapsed')).toBe(true);

  //   button.simulate('press');
  //   expect(wrapper.find(Collapsible).prop('collapsed')).toBe(false);

  //   button.simulate('press');
  //   expect(wrapper.find(Collapsible).prop('collapsed')).toBe(true);
  // });
});
