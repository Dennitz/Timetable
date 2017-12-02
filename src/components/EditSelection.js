// @flow
import React from 'react';
import { ScrollView, Text } from 'react-native';
import RemoveButtonRow from './RemoveButtonRow';
import HorizontalDividerList from './HorizontalDividerList';
import styles from './styles/EditSelection.styles';

type Props = {
  courses: Array<Course>,
  onPress: (id: string) => void,
  onRemovePress: (id: string, appointmentIds: Array<string>) => void,
  showRemoveButtons: boolean,
};

export default function EditSelection(props: Props) {
  const { courses, onPress, onRemovePress, showRemoveButtons } = props;
  return (
    <ScrollView style={styles.container}>
      <HorizontalDividerList hasBottomDivider>
        {courses.map(course => (
          <RemoveButtonRow
            height={48}
            onRowPress={() => onPress(course.id)}
            onRemovePress={() => onRemovePress(course.id, course.appointments)}
            showRemoveButton={showRemoveButtons}
            key={course.id}
          >
            <Text style={styles.text}>{course.name}</Text>
          </RemoveButtonRow>
        ))}
      </HorizontalDividerList>
    </ScrollView>
  );
}
