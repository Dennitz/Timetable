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
    medium: 35,
    large: 45,
    xl: 60,
  },
  images: {
    small: 20,
    medium: 40,
    large: 60,
    logo: 300,
  },
};

export default metrics;
