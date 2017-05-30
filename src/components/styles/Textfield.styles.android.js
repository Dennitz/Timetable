// @flow
import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../themes';

const styles = StyleSheet.create({
  error: {
    color: colors.error,
    marginTop: 8,
  },
  textfield: {
    height: 32,
  },
  textInput: {
    flex: 1,
    ...fonts.base,
    fontSize: fonts.sizes.regular,
    fontWeight: fonts.weights.regular,
    color: colors.darkPrimary,
  },
  spacer: {
    height: 8,
  },
});

export default styles;
