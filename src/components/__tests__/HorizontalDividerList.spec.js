// @flow
import React from 'react';
import { Text } from 'react-native';
import renderer from 'react-test-renderer';
import HorizontalDividerList from '../HorizontalDividerList';

describe('HorizontalDividerList component', () => {
  it('renders children with horizontal divider lines between them', () => {
    const tree = renderer.create(
      <HorizontalDividerList>
        <Text>Child 1</Text>
        <Text>Child 2</Text>
        <Text>Child 3</Text>
      </HorizontalDividerList>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
