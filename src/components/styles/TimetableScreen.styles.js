// @flow
import { StyleSheet } from 'react-native';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { colors, fonts } from '../../themes';

export const STATUSBAR_HEIGHT = isIphoneX() ? 44 : 20;
export const NAVBAR_HEIGHT = 44;

const styles = StyleSheet.create({
  bottomSpacer: {
    height: 24,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 16,
  },
  container: {
    flex: 1,
  },
  horizontalList: {
    backgroundColor: colors.background,
    overflow: 'visible',
  },
  navBarBackground: {
    backgroundColor: colors.primary500,
    height: NAVBAR_HEIGHT,
  },
  navBarTitle: {
    ...fonts.base,
    fontSize: fonts.sizes.heading,
    fontWeight: fonts.weights.medium,
    textAlign: 'center',
    lineHeight: fonts.sizes.heading,
    color: 'white',
  },
  navBarTitleContainer: {
    marginTop: -NAVBAR_HEIGHT,
    height: NAVBAR_HEIGHT,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusbar: {
    backgroundColor: colors.primary500,
    height: STATUSBAR_HEIGHT,
    zIndex: 1,
  },
});

export default styles;
