// @flow
import React from 'react';
import { DatePickerIOS, View } from 'react-native';
import moment from 'moment';
import CollapsibleField from './CollapsibleField';
import styles from './styles/TimePickerCollapsible.styles';
import type { Collapsible } from './CollapsibleField';

const MINUTE_INTERVAL = 5;

type Input = {
  value: Date,
  onChange: (value: any) => void,
}

type Props = {
  onCollapse?: () => void,
  onExpand?: () => void,
  starttime: {
    input: Input,
    meta: Object,
  },
  endtime: {
    input: Input,
    meta: Object,
  },
}

type State = {
  minuteInterval: 1 | 2 | 3 | 4 | 5 | 6 | 10 | 12 | 15 | 20 | 30 | void,
}

/**
 * To be used as component in a redux-form Fields component
 */
export default class TimePickerCollapsible extends React.Component<Props, State>
  implements Collapsible {
  state = {
    minuteInterval: undefined,
  };

  // DatePickerIOS only uses minuteInterval if set after mount
  /* eslint-disable react/no-did-mount-set-state */
  componentDidMount() {
    this.setState({
      minuteInterval: MINUTE_INTERVAL,
    });
  }
  /* eslint-enable react/no-did-mount-set-state */

  collapse = () => {
    if (this._collapsibleRef) {
      this._collapsibleRef.collapse();
    }
  };

  expand = () => {
    if (this._collapsibleRef) {
      this._collapsibleRef.expand();
    }
  };

  _collapsibleRef: CollapsibleField | null;

  render() {
    const { starttime, endtime, ...rest } = this.props;
    const { minuteInterval } = this.state;
    const headerText =
      starttime.input.value &&
      endtime.input.value &&
      `${moment(starttime.input.value).format('LT')} - ${moment(
        endtime.input.value,
      ).format('LT')}`;

    return (
      <CollapsibleField
        ref={(collapsible) => {
          this._collapsibleRef = collapsible;
        }}
        headerText={headerText}
        meta={endtime.meta}
        {...rest}
      >
        <View style={styles.pickerContainer}>
          {/* $FlowIssue */}
          <DatePickerIOS
            {...starttime.input}
            date={starttime.input.value}
            onDateChange={starttime.input.onChange}
            mode="time"
            minuteInterval={minuteInterval}
            style={styles.picker}
          />
          <View style={styles.dash} />
          <DatePickerIOS
            {...endtime.input}
            date={endtime.input.value}
            onDateChange={endtime.input.onChange}
            mode="time"
            minuteInterval={minuteInterval}
            style={styles.picker}
          />
        </View>
      </CollapsibleField>
    );
  }
}
