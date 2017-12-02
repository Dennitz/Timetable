// @flow
import React from 'react';
import { Picker, View } from 'react-native';
import moment from 'moment';
import { createSelector } from 'reselect';
import styles from './styles/DatePicker.styles.ios';

const START_YEAR = 1970;
const END_YEAR = 2100;

const YEARS: Array<number> = (() => {
  const years = [];
  for (let i = START_YEAR; i <= END_YEAR; i += 1) {
    years.push(i);
  }
  return years;
})();

const getDates: (year: number) => Array<moment> = createSelector(
  year => year,
  year => {
    const dates = [];
    const current = moment()
      .year(year)
      .startOf('year');
    const end = moment()
      .year(year)
      .endOf('year');
    while (current.isSameOrBefore(end)) {
      dates.push(current.clone());
      current.add(1, 'day');
    }
    return dates;
  },
);

type Input = {
  value: moment$Moment,
  onChange: (value: any) => void,
};

type Props = {
  input: Input,
};

export default function DatePicker({ input }: Props) {
  const { onChange, value } = input;
  return (
    <View style={styles.container}>
      <View style={styles.spacer} />
      <Picker
        onValueChange={(date: string) => onChange(moment(date))}
        selectedValue={value.toISOString()}
        style={styles.datePicker}
      >
        {getDates(value.year()).map(date => (
          <Picker.Item
            label={date.format('ddd, MMM D')}
            // value must be a string or will automatically be parsed to string
            value={date.toISOString()}
            key={date.toISOString()}
          />
        ))}
      </Picker>
      <Picker
        onValueChange={year => onChange(value.clone().year(year))}
        selectedValue={value.year()}
        style={styles.yearPicker}
      >
        {YEARS.map((year: number) => (
          <Picker.Item label={String(year)} value={year} key={year} />
        ))}
      </Picker>
      <View style={styles.spacer} />
    </View>
  );
}
