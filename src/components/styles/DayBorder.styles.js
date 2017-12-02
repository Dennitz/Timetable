// @flow
import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../themes';

const styles = StyleSheet.create({
  appointmentsContainer: {
    backgroundColor: colors.cardBackground,
  },
  sectionTitle: {
    justifyContent: 'center',
    height: 48,
    marginLeft: 16,
  },
  dateText: {
    ...fonts.base,
    fontSize: fonts.sizes.small,
    fontWeight: fonts.weights.medium,
    color: colors.darkSecondary,
  },
  dividerStyle: {
    height: 1,
    marginHorizontal: 16,
  },
});

export default styles;
