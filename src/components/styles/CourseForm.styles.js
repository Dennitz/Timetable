// @flow
import { StyleSheet } from 'react-native';

import { colors, fonts } from '../../themes';

const baseFont = {
  ...fonts.base,
  fontSize: fonts.sizes.regular,
  fontWeight: fonts.weights.regular,
  lineHeight: fonts.sizes.regular,
};

const horizontalLine = {
  height: 1,
  backgroundColor: colors.darkDivider,
  marginTop: 4, // ends up being margin 8 until <Text /> because of chevron height
  marginBottom: 12,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cardBackground,
    paddingHorizontal: 16,
  },
  appointmentListContainer: {
    flex: 1,
  },
  appointmentTextContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  primaryText: {
    ...baseFont,
    color: colors.darkPrimary,
    lineHeight: baseFont.lineHeight + 4,
  },
  secondaryText: {
    ...baseFont,
    color: colors.darkSecondary,
  },
  hintText: {
    ...baseFont,
    color: colors.darkHint,
  },
  error: {
    ...fonts.base,
    fontSize: fonts.sizes.small,
    color: colors.secondaryA400,
    marginTop: -8,
  },
  horizontalLine,
  shortHorizontalLine: {
    ...horizontalLine,
    marginLeft: 42,
  },
  removeCourseButton: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.secondaryA200,
    height: 32,
  },
  removeCourseButtonText: {
    ...fonts.base,
    fontSize: fonts.sizes.regular,
    fontWeight: fonts.weights.medium,
    color: 'white',
    marginHorizontal: 16,
  },
  spacer: {
    height: 48,
  },
  navBarSpacer: {
    height: 32,
  },
});

export default styles;
