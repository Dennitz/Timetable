// @flow

import { StyleSheet } from 'react-native';

import { colors, fonts } from '../../themes';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 72,
    alignItems: 'center',
  },
  timeContainer: {
    left: 16,
    justifyContent: 'center',
  },
  time: {
    textAlign: 'center',
  },
  infoSpacer: { // moves infoContainer to the desired position
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: 72,
  },
  infoContainer: {
    justifyContent: 'center',
  },
  title: {
    ...fonts.base,
    fontSize: fonts.sizes.heading,
    fontWeight: fonts.weights.regular,
    color: colors.primary700,
  },
  secondaryText: {
    ...fonts.base,
    fontSize: fonts.sizes.regular,
    fontWeight: fonts.weights.regular,
    color: colors.darkSecondary,
  },
  lineSpacer: {
    marginTop: 6,
  },
  dash: {
    height: 1.5,
    width: 5,
    backgroundColor: colors.darkSecondary,
    alignSelf: 'center',
    marginVertical: 4,
  },
});

export default styles;
