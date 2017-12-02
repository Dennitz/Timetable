// @flow
import React from 'react';
import { Keyboard, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Field, Fields } from 'redux-form';
import i18n from 'react-native-i18n';
import moment from 'moment';

/* eslint-disable import/no-unresolved, import/extensions */
import DatePickerCollapsible from './DatePickerCollapsible';
import Textfield from './Textfield';
import TimePickerCollapsible from './TimePickerCollapsible'; // uses platform specific code
/* eslint-enable import/no-unresolved, import/extensions */
import styles from './styles/AppointmentForm.styles';
import type { Collapsible } from './CollapsibleField';

type Props = {
  onRecurrencePress: (input: { value: any }) => void,
};

type FieldProps = {
  input: {
    onPress: () => void,
    value: any,
  },
};

type FieldRef = {
  getRenderedComponent: () => Collapsible,
};

function RecurrenceRow({ input, onRecurrencePress }: Props & FieldProps) {
  return (
    <Textfield
      isButton
      onPress={() => onRecurrencePress(input)}
      editable={false}
      value={i18n.t(input.value)}
      label={i18n.t('repeat')}
    />
  );
}

export default class AppointmentForm extends React.Component<Props, {}> {
  _fieldRefs = {};

  _closeExpandedField = () => {
    if (this._lastExpandedField) {
      this._lastExpandedField.getRenderedComponent().collapse();
    }
    this._lastExpandedField = null;
  };

  _handleExpand = (fieldRef: FieldRef | null) => {
    if (fieldRef !== null) {
      if (this._lastExpandedField !== fieldRef) {
        this._closeExpandedField();
      }
      Keyboard.dismiss();
      this._lastExpandedField = fieldRef;
    }
  };

  _lastExpandedField: ?FieldRef;
  _fieldRefs: {
    timeRef: FieldRef | null,
    startdateRef: FieldRef | null,
    enddateRef: FieldRef | null,
  };

  render() {
    const { onRecurrencePress } = this.props;
    const { timeRef, startdateRef, enddateRef } = this._fieldRefs;
    return (
      <KeyboardAwareScrollView
        style={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.navBarSpacer} />
        <Fields
          withRef
          ref={field => {
            this._fieldRefs.timeRef = field;
          }}
          names={['starttime', 'endtime']}
          component={TimePickerCollapsible}
          label={i18n.t('time')}
          parse={(value: Date) => value && moment(value)}
          format={(value: moment) => value && value.toDate()}
          onExpand={() => this._handleExpand(timeRef)}
        />
        <View style={styles.spacer} />
        <Field
          withRef
          ref={field => {
            this._fieldRefs.startdateRef = field;
          }}
          name={'startdate'}
          component={DatePickerCollapsible}
          label={i18n.t('starts')}
          onExpand={() => this._handleExpand(startdateRef)}
        />
        <View style={styles.spacer} />
        <Field
          withRef
          ref={field => {
            this._fieldRefs.enddateRef = field;
          }}
          name={'enddate'}
          component={DatePickerCollapsible}
          label={i18n.t('ends')}
          onExpand={() => this._handleExpand(enddateRef)}
        />
        <View style={styles.spacer} />
        <Field
          name={'recurrence'}
          component={RecurrenceRow}
          onRecurrencePress={onRecurrencePress}
        />
        <View style={styles.spacer} />
        <View style={styles.spacer} />
        <Field
          name={'location'}
          component={Textfield}
          placeholder={i18n.t('location')}
          onFocus={this._closeExpandedField}
        />
        <View style={styles.spacer} />
        <Field
          name={'type'}
          component={Textfield}
          placeholder={i18n.t('type')}
          onFocus={this._closeExpandedField}
        />
      </KeyboardAwareScrollView>
    );
  }
}
