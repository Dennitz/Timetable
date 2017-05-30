// @flow
import React from 'react';
import { shallow } from 'enzyme';
import AppointmentForm from '../AppointmentForm';

describe('AppointmentForm component', () => {
  it('renders input fields for appointment data', () => {
    const wrapper = shallow(<AppointmentForm index={0} field="someFieldArray[0]" />);
    expect(wrapper).toMatchSnapshot();
  });
});
