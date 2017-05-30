import React from 'react';
import renderer from 'react-test-renderer';
import {
  AddButton,
  BackButton,
  CloseButton,
  DrawerButton,
  SearchButton,
  TextButton,
} from '../NavButtons';

it('renders AddButton correctly', () => {
  const tree = renderer.create(
    <AddButton onPress={() => {}} />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders BackButton correctly with title', () => {
  const tree = renderer.create(
    <BackButton onPress={() => {}} title="Test" />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders BackButton correctly without title', () => {
  const tree = renderer.create(
    <BackButton onPress={() => {}} />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders CloseButton correctly', () => {
  const tree = renderer.create(
    <CloseButton onPress={() => {}} />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders DrawerButton correctly', () => {
  const tree = renderer.create(
    <DrawerButton onPress={() => {}} />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders SearchButton correctly', () => {
  const tree = renderer.create(
    <SearchButton onPress={() => {}} />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders TextButton correctly', () => {
  const tree = renderer.create(
    <TextButton onPress={() => {}} title="Test" />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
