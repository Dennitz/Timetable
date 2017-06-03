/* eslint-disable */
// require('react-native-mock/mock'); // incompatible with current react version
require('../../src/i18n/I18n');

jest.mock('Linking', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  openURL: jest.fn(),
  canOpenURL: jest.fn(),
  getInitialURL: jest.fn(),
}));
