// @flow
/* eslint-disable no-undef */

// tab related properties are left out because they are not used
// in this project
declare type NativeNavigator = {
  push: ({
    screen: string,
    title?: string,
    titleImage?: any,
    passProps?: Object,
    animated?: boolean,
    backButtonTitle?: string,
    backButtonHidden?: boolean,
    navigatorStyle?: Object,
    navigatorButtons?: Object,
  }) => void,
  pop: (params?: { animated?: boolean }) => void,
  popToRoot: (params?: { animated?: boolean }) => void,
  resetTo: ({
    screen: string,
    title?: string,
    passProps?: Object,
    animated?: boolean,
    navigatorStyle?: Object,
    navigatorButtons?: Object,
  }) => void,
  showModal: ({
    screen: string,
    title?: string,
    passProps?: Object,
    animationType?: 'slide-up' | 'none',
    navigatorStyle?: Object,
  }) => void,
  dismissModal: (params?: { animationType?: 'slide-up' | 'none' }) => void,
  dismissAllModals: (params?: { animationType?: 'slide-up' | 'none' }) => void,
  showLightBox: ({
    screen: string,
    passProps?: Object,
    style: {
      backgroundBlur: 'dark' | 'light' | 'xlight' | 'none',
      backgroundColor?: string,
    },
  }) => void,
  dismissLightBox: () => void,
  handleDeepLink: ({ link: string }) => void,
  setOnNavigatorEvent: (callback: (event: NavigatorEvent) => void) => void,
  setButtons: ({
    leftButtons?: Array<ButtonProps>,
    rightButtons?: Array<ButtonProps>,
    animated?: boolean,
  }) => void,
  setTitle: ({ title: string }) => void,
  toggleNavBar: ({
    to: 'hidden' | 'shown',
    animated?: boolean,
  }) => void,
};

type NavigatorEvent = {
  type: 'NavBarButtonPress',
  id: string,
};

type ButtonProps = {
  id: string,
  title?: string,
  icon?: any,
  testID?: string,
  disabled?: boolean,
  disableIconTint?: boolean,
  showAsAction?: 'ifRoom' | 'always' | 'withText' | 'never',
  buttonColor?: string,
  buttonFontSize?: number,
  buttonFontWeight?: string,
};

declare type NavigatorButtons = {
  leftButtons?: Array<ButtonProps>,
  rightButtons?: Array<ButtonProps>,
};
