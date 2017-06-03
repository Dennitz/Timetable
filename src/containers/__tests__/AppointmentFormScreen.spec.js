// @flow
import React from 'react';
import { shallow } from 'enzyme';
import navigatorMock from '../../lib/navigatorMock';
import { AppointmentFormScreen } from '../AppointmentFormScreen';

const props = {
  dispatch: jest.fn(),
  navigator: navigatorMock,
  onSubmit: jest.fn(),
};

describe('AppointmentFormScreen', () => {
  it('renders an AppointmentForm correctly', () => {
    const wrapper = shallow(<AppointmentFormScreen {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
