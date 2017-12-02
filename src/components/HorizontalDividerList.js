// @flow
import * as React from 'react';
import { View } from 'react-native';
import styles from './styles/HorizontalDividerList.styles';

type Props = {
  children?: React.Node,
  dividerStyle?: any,
  hasBottomDivider?: boolean,
};

export default function HorizontalDividerList(props: Props) {
  const { children, dividerStyle, hasBottomDivider } = props;
  return (
    <View>
      {React.Children.toArray(children).reduce((elements, child, i, array) => {
        elements.push(child);
        if (
          (hasBottomDivider && i < array.length) ||
          (!hasBottomDivider && i < array.length - 1)
        ) {
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
