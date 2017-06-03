// @flow
import React from 'react';
import { shallow } from 'enzyme';
import AppointmentForm from '../AppointmentForm';

const props = {
  onRecurrencePress: jest.fn(),
};

describe('AppointmentForm component', () => {
  it('renders input fields for appointment data', () => {
    const wrapper = shallow(<AppointmentForm {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
