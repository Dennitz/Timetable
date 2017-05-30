// @flow
import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../themes';

const baseFont = {
  ...fonts.base,
  fontSize: fonts.sizes.regular,
  fontWeight: fonts.weights.regular,
  lineHeight: fonts.sizes.regular,
};

const textInputBase = {
  ...baseFont,
  height: 28,
  alignItems: 'flex-end',
};

const styles = StyleSheet.create({
  chevronContainer: {
    marginRight: -8, // aligns the actual chevron instead of it's border
  },
  error: {
    ...fonts.base,
    fontSize: fonts.sizes.small,
    color: colors.secondaryA400,
    marginTop: 8,
  },
  label: {
    ...baseFont,
    color: colors.darkPrimary,
  },
  labelAndFieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fieldContainer: {
    flex: 1,

  },
  textInput: {
    ...textInputBase,
    color: colors.darkPrimary,
  },
  textInputWithLabel: {
    ...textInputBase,
    color: colors.darkSecondary,
    textAlign: 'right',
  },
  horizontalLine: {
    height: 1,
  },
});

export default styles;
