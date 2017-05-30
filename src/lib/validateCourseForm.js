// @flow
import i18n from 'react-native-i18n';

export default function validate(values: any) {
  const errors = {};
  if (!values.name) {
    errors.name = i18n.t('title-is-required');
  }
  if (!values.appointments || !values.appointments.length) {
    errors.appointments = { _error: i18n.t('one-appointment-required') };
  }
  return errors;
}
