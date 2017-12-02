// @flow
import * as React from 'react';
import { View } from 'react-native';
import { RemoveButton } from './NavButtons';
import ChevronRowButton from './ChevronRowButton';
import { colors } from '../themes';
import styles from './styles/RemoveButtonRow.styles';

type Props = {
  children?: React.Node,
  height?: number,
  onRemovePress: () => void,
  onRowPress: () => void,
  showRemoveButton?: boolean,
}

export default function RemoveButtonRow(props: Props) {
  const {
    children,
    height,
    onRemovePress,
    onRowPress,
    showRemoveButton,
  } = props;
  return (
    <View style={styles.rowContentContainer}>
      {showRemoveButton && (
        <RemoveButton onPress={onRemovePress} color={colors.secondaryA200} />
      )}
      {showRemoveButton && <View style={styles.removeButtonSpacer} />}
      <ChevronRowButton onPress={onRowPress} height={height}>
        {children}
      </ChevronRowButton>
    </View>
  );
}

RemoveButtonRow.defaultProps = {
  children: undefined,
  height: undefined,
  showRemoveButton: true,
};
