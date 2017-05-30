// @flow
import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../themes';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  text: {
    ...fonts.base,
    fontSize: fonts.sizes.heading,
    fontWeight: fonts.weights.regular,
    color: colors.primary700,
  },
});

export default styles;
