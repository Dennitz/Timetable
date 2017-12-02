// @flow
import * as React from 'react';
import { Text, View } from 'react-native';
import ElevatedView from 'react-native-elevated-view';

import HorizontalDividerList from './HorizontalDividerList';
import styles from './styles/DayBorder.styles';

type Props = {
  date: string,
  children?: React.Node,
};

export default function DayBorder({ date, children }: Props) {
  return (
    <View>
      <View style={styles.sectionTitle}>
        <Text style={styles.dateText}>{date}</Text>
      </View>
      <ElevatedView elevation={2} style={styles.appointmentsContainer}>
        <HorizontalDividerList dividerStyle={styles.dividerStyle}>
          {children}
        </HorizontalDividerList>
      </ElevatedView>
    </View>
  );
}

DayBorder.defaultProps = {
  children: undefined,
};
