// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import TimetableScreen from '../TimetableScreen';
import navigatorMock from '../../lib/navigatorMock';

const props = {
  navigator: navigatorMock,
};

describe('TimetableScreen', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <TimetableScreen {...props} />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
