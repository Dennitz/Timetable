// @flow
import { StyleSheet } from 'react-native';
import { fonts } from '../../themes';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  row: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkmarkContainer: {
    flexDirection: 'row',
    width: 40,
    alignItems: 'center',
  },
  divider: {
    marginLeft: 40,
  },
  leftSpacer: {
    width: 16,
  },
  text: {
    ...fonts.base,
    fontSize: fonts.sizes.regular,
    fontWeight: fonts.weights.regular,
  },
});

export default styles;
