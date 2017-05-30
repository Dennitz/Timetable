// @flow
import i18n from 'react-native-i18n';

export default function validate(values: any) {
  const errors = {};
  // starttime and endtime errors are displayed in same <Text />
  // so both errors are just put into errors.endtime
  if (values.starttime.isAfter(values.endtime, 'minutes')) {
    errors.endtime = i18n.t('endtime-greater-than-starttime');
  }
  if (values.startdate.isAfter(values.enddate, 'minutes')) {
    errors.enddate = i18n.t('enddate-greater-than-startdate');
  }
  return errors;
}
