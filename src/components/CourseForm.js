// @flow
import React from 'react';
import {
  Alert,
  LayoutAnimation,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import { Field, FieldArray } from 'redux-form';
import i18n from 'react-native-i18n';
import ElevatedView from 'react-native-elevated-view';

/* eslint-disable import/no-unresolved, import/extensions */
import Textfield from './Textfield';
/* eslint-enable import/no-unresolved, import/extensions */
import RemoveButtonRow from './RemoveButtonRow';
import defaultLayoutAnimation from '../lib/defaultLayoutAnimation';
import { WEEKLY } from '../lib/recurrence';
import { colors } from '../themes';
import styles from './styles/CourseForm.styles';

type CourseFormProps = {
  error: any,
  hasRemoveButton: boolean,
  navigateToAppointmentForm: (values?: any, index?: number) => void,
  onRemoveCourse: () => void,
  onSubmit: (input: Object) => void,
};

// exported for tests
export function RemoveCourseButton({ onPress }: { onPress: Function }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <ElevatedView elevation={2} style={styles.removeCourseButton}>
        <Text style={styles.removeCourseButtonText}>
          {i18n.t('remove-course')}
        </Text>
      </ElevatedView>
    </TouchableOpacity>
  );
}

// exported for tests
export function Appointments({ fields, meta, navigateToAppointmentForm }: any) {
  return (
    <View style={styles.appointmentListContainer}>
      {fields.map((field, index) => {
        const values: AppointmentInput = fields.get(index);
        const { startdate, enddate, starttime, endtime, recurrence } = values;
        const recurrenceText =
          (recurrence === WEEKLY && i18n.t('every')) || i18n.t('every-2nd');
        return (
          <View key={field}>
            <RemoveButtonRow
              onRemovePress={() => {
                LayoutAnimation.configureNext(defaultLayoutAnimation);
                fields.remove(index);
              }}
              onRowPress={() => navigateToAppointmentForm(values, index)}
            >
              <View style={styles.appointmentTextContainer}>
                <Text style={styles.primaryText}>
                  {`${recurrenceText} ${startdate.format('dddd')}, `}
                </Text>
                <Text style={styles.primaryText}>
                  {`${starttime.format('LT')} - ${endtime.format('LT')},`}
                </Text>
              </View>
              <Text style={styles.primaryText}>{`${startdate.format(
                'L',
              )} - ${enddate.format('L')}`}</Text>
            </RemoveButtonRow>
            <View style={styles.shortHorizontalLine} />
          </View>
        );
      })}
      <Textfield
        isButton
        onPress={() => navigateToAppointmentForm()}
        editable={false}
        placeholder={i18n.t('add-appointment')}
        placeholderColor={colors.darkSecondary}
        meta={meta}
      />
    </View>
  );
}

export default function CourseForm({
  hasRemoveButton,
  navigateToAppointmentForm,
  onRemoveCourse,
}: CourseFormProps) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.navBarSpacer} />
      <Field name="name" component={Textfield} placeholder={i18n.t('title')} />
      <View style={styles.spacer} />
      <FieldArray
        name="appointments"
        component={Appointments}
        navigateToAppointmentForm={navigateToAppointmentForm}
      />
      <View style={styles.spacer} />
      {hasRemoveButton && (
        <RemoveCourseButton
          onPress={() => {
            Alert.alert(
              i18n.t('remove-course'),
              i18n.t('remove-course-alert'),
              [
                {
                  text: i18n.t('delete'),
                  onPress: onRemoveCourse,
                  style: 'destructive',
                },
                { text: i18n.t('cancel'), style: 'cancel' },
              ],
            );
          }}
        />
      )}
    </ScrollView>
  );
}
