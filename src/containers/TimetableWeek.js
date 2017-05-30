// @flow
import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { makeGetSortedAppointmentsPerDay } from '../reducers/appointments';
import TimetableDay from './TimetableDay';
import type { AppointmentsPerDay } from '../reducers/appointments';

type OwnProps = {
  week: moment$Moment,
}

type Props = OwnProps & {
  appointmentsPerDay: AppointmentsPerDay,
}

function TimetableWeek(props: Props) {
  const { appointmentsPerDay, week } = props;
  return (
    <View>
      {appointmentsPerDay.map((appointmentsOfDay, index) => {
        const dateString = week.clone().weekday(index).format('dddd, LL');
        return (
          <TimetableDay
            day={dateString}
            appointmentsOfDay={appointmentsOfDay}
            key={dateString}
          />
        );
      })}
    </View>
  );
}

function makeMapStateToProps() {
  const getSortedAppointmentsPerDay = makeGetSortedAppointmentsPerDay();
  const mapStateToProps = (state: ApplicationState, ownProps: OwnProps) => ({
    appointmentsPerDay: getSortedAppointmentsPerDay(state, ownProps.week),
  });
  return mapStateToProps;
}

const ConnectedTimetableWeek: (props: OwnProps) => React$Element<any>
  = connect(makeMapStateToProps)(TimetableWeek);

export default ConnectedTimetableWeek;
