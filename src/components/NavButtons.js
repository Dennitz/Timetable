// @flow
import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors, metrics } from '../themes';

type ButtonProps = {
  color?: string,
  onPress: Function,
};

function NavButtonBase(
  name: string,
  onPress: Function,
  color?: string = colors.navButton,
) {
  return (
    <TouchableOpacity
      onPress={onPress}
      hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
    >
      <Icon name={name} size={metrics.icons.small} color={color} />
    </TouchableOpacity>
  );
}
export function AddButton({ color, onPress }: ButtonProps) {
  return NavButtonBase('add', onPress, color);
}

export function CloseButton({ color, onPress }: ButtonProps) {
  return NavButtonBase('close', onPress, color);
}

export function EditButton({ color, onPress }: ButtonProps) {
  return NavButtonBase('edit', onPress, color);
}

export function RemoveButton({ color, onPress }: ButtonProps) {
  return NavButtonBase('remove-circle', onPress, color);
}
