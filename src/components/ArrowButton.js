// @flow
import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { metrics } from '../themes';

type Props = {
  color: string,
  type: 'back' | 'forward',
  onPress: Function,
};

export default function ArrowButton({ color, type, onPress }: Props) {
  const iconName = type === 'back' ? 'arrow-back' : 'arrow-forward';
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon name={iconName} size={metrics.icons.small} color={color} />
    </TouchableOpacity>
  );
}
