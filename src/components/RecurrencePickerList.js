/**
 * A list to pick the recurrence of an appointment
 * @flow
 */
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import i18n from 'react-native-i18n';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HorizontalDividerList from './HorizontalDividerList';
import { WEEKLY, BIWEEKLY } from '../lib/recurrence';
import { colors, metrics } from '../themes';
import styles from './styles/RecurrencePickerList.styles';

type Props = {
  onSelect: (value: 'WEEKLY' | 'BIWEEKLY') => void,
  selectedRecurrence: 'WEEKLY' | 'BIWEEKLY',
};

const recurrenceOptions = [WEEKLY, BIWEEKLY];

export default function RecurrencePickerList({
  onSelect,
  selectedRecurrence,
}: Props) {
  return (
    <ScrollView style={styles.container}>
      <HorizontalDividerList dividerStyle={styles.divider}>
        {recurrenceOptions.map(recurrence => (
          <TouchableOpacity
            style={styles.row}
            onPress={() => onSelect(recurrence)}
            key={recurrence}
          >
            <View style={styles.checkmarkContainer}>
              {selectedRecurrence === recurrence && (
                <Icon
                  name={'check'}
                  size={metrics.icons.small}
                  color={colors.secondaryA200}
                />
              )}
            </View>
            <Text style={styles.text}>{i18n.t(recurrence)}</Text>
          </TouchableOpacity>
        ))}
      </HorizontalDividerList>
    </ScrollView>
  );
}
