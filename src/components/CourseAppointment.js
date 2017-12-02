// @flow
import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles/CourseAppointment.styles';

type Props = {
  name: string,
  starttime: moment$Moment,
  endtime: moment$Moment,
  location?: string,
  type?: string,
};

export default function CourseAppointment(props: Props) {
  const { starttime, endtime, name, location, type } = props;
  const start = starttime.format('H:mm');
  const end = endtime.format('H:mm');
  const secondaryInfo =
    (location || type) &&
    `${location || ''}${(location && type && ', ') || ''}${type || ''}`;
  return (
    <View style={styles.container}>
      <View style={styles.infoSpacer}>
        <View style={styles.timeContainer}>
          <Text style={[styles.time, styles.secondaryText]}>{start}</Text>
          <View style={styles.dash} />
          <Text style={[styles.time, styles.secondaryText]}>{end}</Text>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{name}</Text>
        {secondaryInfo && (
          <View style={styles.lineSpacer}>
            <Text style={styles.secondaryText}>{secondaryInfo}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

CourseAppointment.defaultProps = {
  location: undefined,
  type: undefined,
};
