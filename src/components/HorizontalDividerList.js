// @flow
import React from 'react';
import { View } from 'react-native';
import styles from './styles/HorizontalDividerList.styles';

type Props = {
  children?: React$Element<any>,
  dividerStyle?: any,
  hasBottomDivider?: boolean,
}

export default function HorizontalDividerList(props: Props) {
  const {
    children,
    dividerStyle,
    hasBottomDivider,
     } = props;
  return (
    <View>
      {React.Children.toArray(children).reduce((elements, child, i, array) => {
        elements.push(child);
        if (i < (hasBottomDivider && array.length) || array.length - 1) {
          elements.push(
            <View
              style={[styles.divider, dividerStyle]}
              key={`${child.key} divider line`}
            />,
          );
        }
        return elements;
      }, [])}
    </View>
  );
}

HorizontalDividerList.defaultProps = {
  children: undefined,
  dividerStyle: undefined,
  hasBottomDivider: false,
};
