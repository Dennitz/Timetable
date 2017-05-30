// @flow
import React from 'react';
import { shallow } from 'enzyme';
import { AppointmentFormScreen } from '../AppointmentFormScreen';

const props = {
  dispatch: jest.fn(),
  navigation: {
    state: {
      params: {
        onSubmit: jest.fn(),
      },
    },
    setParams: jest.fn(),
  },
};

describe('AppointmentFormScreen', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders an AppointmentForm correctly', () => {
    const wrapper = shallow(<AppointmentFormScreen {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
