// @flow
import React from 'react';
import { Text } from 'react-native';
import renderer from 'react-test-renderer';
import DayBorder from '../DayBorder';

describe('DayBorder component', () => {
  it('renders a given date text and all children beneath that', () => {
    const tree = renderer.create(
      <DayBorder date="some date">
        <Text>Child 1</Text>
        <Text>Child 2</Text>
      </DayBorder>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
