// @flow
import { Navigation } from 'react-native-navigation';
import AppointmentFormScreen from './containers/AppointmentFormScreen';
import CourseFormScreen from './containers/CourseFormScreen';
import EditSelectionScreen from './containers/EditSelectionScreen';
import RecurrencePickerScreen from './containers/RecurrencePickerScreen';
import TimetableScreen from './components/TimetableScreen';

export const APPOINTMENT_FORM = 'APPOINTMENT_FORM';
export const COURSE_FORM = 'COURSE_FORM';
export const EDIT_SELECTION = 'EDIT_SELECTION';
export const RECURRENCE_PICKER = 'RECURRENCE_PICKER';
export const TIMETABLE = 'TIMETABLE';

export default function registerScreens(store: Object, Provider: any) {
  Navigation.registerComponent(APPOINTMENT_FORM, () => AppointmentFormScreen, store, Provider);
  Navigation.registerComponent(COURSE_FORM, () => CourseFormScreen, store, Provider);
  Navigation.registerComponent(EDIT_SELECTION, () => EditSelectionScreen, store, Provider);
  Navigation.registerComponent(RECURRENCE_PICKER, () => RecurrencePickerScreen, store, Provider);
  Navigation.registerComponent(TIMETABLE, () => TimetableScreen, store, Provider);
}
