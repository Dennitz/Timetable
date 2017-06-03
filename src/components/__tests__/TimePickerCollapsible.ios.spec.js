// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import CollapsibleField from '../CollapsibleField';
import TimePickerCollapsible from '../TimePickerCollapsible.ios';

const props = {
  starttime: {
    input: {
      onChange: jest.fn(),
      value: new Date(1),
    },
    meta: {
      submitFailed: true,
      error: 'starttime error',
    },
  },
  endtime: {
    input: {
      onChange: jest.fn(),
      value: new Date(2),
    },
    meta: {
      submitFailed: true,
      error: 'endtime error',
    },
  },
  placeholder: 'Some time',
};

describe('TimePickerCollapsible', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<TimePickerCollapsible {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('calls starttime.input.onChange when the value of the left picker changes', () => {
    const wrapper = shallow(<TimePickerCollapsible {...props} />);
    wrapper.find(CollapsibleField)
      .shallow()
      .find({ onDateChange: props.starttime.input.onChange })
      .simulate('dateChange');
    const { onChange } = props.starttime.input;
    expect(onChange.mock.calls.length).toBe(1);
  });

  it('calls endtime.input.onChange when the value of the right picker changes', () => {
    const wrapper = shallow(<TimePickerCollapsible {...props} />);
    wrapper.find(CollapsibleField)
      .shallow()
      .find({ onDateChange: props.endtime.input.onChange })
      .simulate('dateChange');
    const { onChange } = props.endtime.input;
    expect(onChange.mock.calls.length).toBe(1);
  });
});
