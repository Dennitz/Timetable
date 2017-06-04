// @flow

import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const metrics = {
  navBarButtonPadding: 12,
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  textfieldHeight: 48,
  icons: {
    tiny: 18,
    small: 24,
  },
};

export default metrics;
