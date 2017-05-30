// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { MKTextField } from 'react-native-material-kit';
import Textfield from '../Textfield';

const props = {
  input: {
    onChange: jest.fn(),
    value: 'some value',
  },
  value: 'another value',
};

describe('Textfield component', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders correctly', () => {
    const tree = renderer.create(<Textfield {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders error messages correctly', () => {
    const otherProps = {
      ...props,
      meta: {
        error: 'an error message',
        submitFailed: true,
        touched: true,
      },
    };
    const tree = renderer.create(<Textfield {...otherProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('uses props.input.value as value if defined', () => {
    const wrapper = shallow(<Textfield {...props} />);
    const textfield = wrapper.find(MKTextField);
    expect(textfield.prop('value')).toBe(props.input.value);
  });

  it('uses props.value as value if props.input.value is not defined', () => {
    const otherProps = {
      input: {
        onChange: () => { },
      },
      value: 'another value',
    };
    const wrapper = shallow(<Textfield {...otherProps} />);
    const textfield = wrapper.find(MKTextField);
    expect(textfield.prop('value')).toBe(otherProps.value);
  });

  it('calls input.onChange with new input when input changes', () => {
    const wrapper = shallow(<Textfield {...props} />);
    const textfield = wrapper.find(MKTextField);
    textfield.simulate('changeText', 'new text');
    const { onChange } = props.input;
    expect(onChange.mock.calls.length).toBe(1);
    expect(onChange.mock.calls[0][0]).toBe('new text');
  });
});
