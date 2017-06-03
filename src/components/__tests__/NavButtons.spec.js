// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import {
  AddButton,
  CloseButton,
} from '../NavButtons';

it('renders AddButton correctly', () => {
  const tree = renderer.create(
    <AddButton onPress={() => {}} />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders CloseButton correctly', () => {
  const tree = renderer.create(
    <CloseButton onPress={() => {}} />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
