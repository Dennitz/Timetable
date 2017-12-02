// @flow
import * as React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors, metrics } from '../themes';
import styles from './styles/ChevronRowButton.styles';

type Props = {
  children?: React.Node,
  height?: number,
  onPress: Function,
}

// Icon is wrapped in a View to make LayoutAnimation work correctly
export default function ChevronRowButton({ children, height, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, { height }]}>
      <View style={styles.childrenContainer}>{children}</View>
      <View style={styles.chevronContainer}>
        <Icon
          name={'chevron-right'}
          size={metrics.icons.small}
          color={colors.darkHint}
        />
      </View>
    </TouchableOpacity>
  );
}

ChevronRowButton.defaultProps = {
  children: undefined,
  height: undefined,
};
